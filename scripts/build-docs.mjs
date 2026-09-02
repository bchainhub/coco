import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { buildStyleguide, parseStyleguide } from 'kss-modern';
import { parse } from 'sassdoc-parser';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '.site');
const packageData = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

await rm(output, { force: true, recursive: true });
await mkdir(resolve(output, 'assets'), { recursive: true });

await Promise.all([
  cp(resolve(root, 'preview/html'), resolve(output, 'preview/html'), { recursive: true }),
  cp(resolve(root, 'preview/assets'), resolve(output, 'preview/assets'), { recursive: true }),
  cp(resolve(root, 'dist/coco.css'), resolve(output, 'assets/coco.css')),
]);

const sassdocConfig = JSON.parse(await readFile(resolve(root, '.sassdocrc'), 'utf8'));
const scssRoot = resolve(root, 'scss');
const scssFiles = await collectScssFiles(scssRoot);
const sassdocEntries = (await Promise.all(scssFiles.map(async (file) => {
  const entries = await parse(await readFile(file, 'utf8'));
  return entries.map((entry) => ({
    ...entry,
    source: relative(root, file),
  }));
}))).flat();
await renderSassDoc(sassdocEntries, sassdocConfig, resolve(output, 'api'));

const styleguide = await buildStyleguide({
  mode: 'production',
  outDir: resolve(output, 'styleguide'),
  contentDir: `${resolve(root, 'scss')}/`,
  projectTitle: 'COCO component style guide',
  theme: '#43b649',
  html: {
    lang: 'en',
    assets: {
      css: [{ src: '../assets/coco.css' }],
      js: [],
    },
  },
});

const requiredKssSections = [
  '1.1', '1.2',
  '2.1', '2.2', '2.3', '2.4', '2.5',
  '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9',
  '3.10', '3.11', '3.12', '3.13',
  '4.1', '5.1', '5.2', '6.1', '6.2', '6.3', '6.4', '7.1', '7.2',
];
const parsedStyleguide = await parseStyleguide(`${resolve(root, 'scss')}/`);
const documentedKssSections = new Set(parsedStyleguide.content.flatMap((first) =>
  first.sections.flatMap((second) => [second.id, ...second.sections.map((third) => third.id)])));
const missingKssSections = requiredKssSections.filter((section) =>
  !documentedKssSections.has(section));

if (missingKssSections.length) {
  throw new Error(`Missing required KSS sections: ${missingKssSections.join(', ')}`);
}

await renderLlmDocumentation(
  parsedStyleguide.content,
  sassdocEntries,
  packageData.version,
  output,
);

if (styleguide.errors?.overwrittenSectionsIds?.length) {
  throw new Error(
    `Duplicate KSS sections: ${styleguide.errors.overwrittenSectionsIds.join(', ')}`,
  );
}

await makeStyleguidePathsRelative(resolve(output, 'styleguide'));
await materializeStyleguideModifiers(resolve(output, 'styleguide'));

await writeFile(resolve(output, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>COCO documentation</title>
  <link rel="stylesheet" href="assets/coco.css">
</head>
<body>
  <main class="container">
    <h1>COCO documentation</h1>
    <p class="lead">A JavaScript-free CSS framework built with Sass.</p>
    <nav aria-label="Documentation">
      <ul>
        <li><a href="preview/html/page/color.html">Preview and examples</a></li>
        <li><a href="styleguide/">KSS component style guide</a></li>
        <li><a href="api/">SassDoc API reference</a></li>
        <li><a href="llms.txt">LLM documentation index</a></li>
        <li><a href="llms-full.txt">Complete LLM reference</a></li>
        <li><a href="components.json">Structured component data</a></li>
      </ul>
    </nav>
  </main>
</body>
</html>
`, 'utf8');

console.log(`Documentation built in ${output}`);

async function collectScssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? collectScssFiles(path) : path;
  }));
  return files.flat().filter((file) => file.endsWith('.scss'));
}

async function makeStyleguidePathsRelative(directory) {
  const files = (await readdir(directory)).filter((file) => file.endsWith('.html'));
  await Promise.all(files.map(async (file) => {
    const path = resolve(directory, file);
    const html = await readFile(path, 'utf8');
    await writeFile(path, html
      .replaceAll('href="/', 'href="./')
      .replaceAll('src="/', 'src="./'), 'utf8');
  }));
}

async function materializeStyleguideModifiers(directory) {
	const previewFiles = (await readdir(directory))
		.filter((file) => /^preview-.+\.html$/.test(file));
	let generatedCount = 0;

	await Promise.all(previewFiles.map(async (file) => {
		const path = resolve(directory, file);
		const html = await readFile(path, 'utf8');
		let modifierIndex = 0;
		const generatedPages = [];
		let rendered = html.replace(/<iframe\b[\s\S]*?<\/iframe>/g, (iframe) => {
			const modifier = iframe.match(/\bdata-modifier="([^"]+)"/)?.[1];
			const source = iframe.match(/\bsrc="\.\/(fullpage-[^"]+\.html)"/)?.[1];
			if (!modifier || !source) return iframe;

			const classNames = modifier.match(/\.[a-zA-Z_][\w-]*/g)
				?.map((className) => className.slice(1))
				.join(' ');
			if (!classNames) {
				throw new Error(`Unsupported KSS modifier selector: ${modifier}`);
			}

			modifierIndex += 1;
			generatedCount += 1;
			const variant = source.replace(/\.html$/, `-modifier-${modifierIndex}.html`);
			generatedPages.push({ classNames, modifier, source, variant });
			return iframe.replace(`src="./${source}"`, `src="./${variant}"`);
		});
		for (const { modifier, source, variant } of generatedPages) {
			rendered = rendered.replaceAll(
				`href="./${source}?modifier=${modifier}"`,
				`href="./${variant}"`,
			);
		}

		await Promise.all(generatedPages.map(async ({ classNames, source, variant }) => {
			const fullpage = await readFile(resolve(directory, source), 'utf8');
			if (!fullpage.includes('{{ modifier_class }}')) {
				throw new Error(`KSS modifier placeholder missing from ${source}`);
			}
			await writeFile(
				resolve(directory, variant),
				fullpage.replaceAll('{{ modifier_class }}', classNames),
				'utf8',
			);
		}));
		await writeFile(path, rendered, 'utf8');
	}));

	if (!generatedCount) {
		throw new Error('KSS generated no modifier previews');
	}
}

async function renderLlmDocumentation(groups, sassEntries, version, destination) {
  const components = groups.flatMap((group) => flattenKssSections(group, group.header));
  const sassApi = sassEntries
    .filter((entry) => entry.access !== 'private')
    .map((entry) => ({
      name: entry.name ?? entry.context.name,
      type: entry.context.type,
      description: entry.description.trim(),
      parameters: entry.parameter ?? [],
      returns: entry.return ?? null,
      output: entry.output ?? null,
      since: entry.since ?? [],
      source: entry.source,
      line: entry.context.line?.start ?? entry.commentRange.start,
    }));

  await Promise.all([
    writeFile(resolve(destination, 'components.json'),
      `${JSON.stringify({ framework: 'COCO', version, components }, null, 2)}\n`,
      'utf8'),
    writeFile(resolve(destination, 'sass-api.json'),
      `${JSON.stringify({ framework: 'COCO', version, api: sassApi }, null, 2)}\n`,
      'utf8'),
    writeFile(resolve(destination, 'llms.txt'), `# COCO

> A modular, JavaScript-free CSS framework built with Sass.

COCO ${version} publishes CSS only. Load dist/coco.min.css, use semantic HTML, and
apply the documented component classes. No runtime initialization is required.

## Documentation

- Component style guide: styleguide/
- Sass API reference: api/
- Preview and examples: preview/html/page/color.html
- Structured components: components.json
- Structured Sass API: sass-api.json
- Complete LLM reference: llms-full.txt

## Constraints

- Do not generate or require website-facing JavaScript.
- Prefer semantic HTML and native controls.
- Preserve keyboard, accessibility, responsive, and RTL behavior.
- Use documented modifiers; do not infer undocumented class names.
`, 'utf8'),
    writeFile(resolve(destination, 'llms-full.txt'), renderLlmFull(components, sassApi, version),
      'utf8'),
  ]);
}

function flattenKssSections(section, category) {
  const children = section.sections?.flatMap((child) =>
    flattenKssSections(child, category)) ?? [];
  if (!section.markup && !section.modifiers?.length) return children;
  return [{
    reference: section.id,
    category,
    name: section.header,
    description: section.description.trim(),
    markup: section.markup,
    modifiers: section.modifiers ?? [],
    source: section.source.css.file,
    line: section.source.css.line,
    preview: section.previewFileName ? `styleguide/${section.previewFileName}` : null,
  }, ...children];
}

function renderLlmFull(components, sassApi, version) {
  const componentText = components.map((component) => `## ${component.name}

Reference: ${component.reference}
Category: ${component.category}
Source: ${component.source}:${component.line}

${component.description}

Modifiers:
${component.modifiers.length ? component.modifiers.map((modifier) =>
    `- ${modifier.value}: ${modifier.description}`).join('\n') : '- None'}

Markup:
\`\`\`html
${component.markup}
\`\`\`
`).join('\n');
  const apiText = sassApi.map((entry) => `## ${entry.name}

Type: ${entry.type}
Source: ${entry.source}:${entry.line}

${entry.description}

Parameters:
${entry.parameters.length ? entry.parameters.map((parameter) =>
    `- ${parameter.name}${parameter.type ? ` (${parameter.type})` : ''}: ${parameter.description ?? ''}`).join('\n') : '- None'}

${entry.returns ? `Returns: ${entry.returns.type} — ${entry.returns.description ?? ''}` : ''}
${entry.output ? `Output: ${entry.output}` : ''}
`).join('\n');

  return `# COCO ${version} Complete Reference

COCO is a JavaScript-free CSS framework. This file is generated from KSS and
SassDoc comments. Prefer the documented semantic markup and class names.

# CSS Components

${componentText}
# Sass API

${apiText}`;
}

async function renderSassDoc(entries, config, destination) {
  await mkdir(destination, { recursive: true });
  const visibleEntries = entries
    .filter((entry) => entry.access !== 'private')
    .sort((a, b) => (a.group?.[0] ?? '').localeCompare(b.group?.[0] ?? '')
      || (a.name ?? '').localeCompare(b.name ?? ''));
  const sections = Map.groupBy(visibleEntries, (entry) => entry.group?.[0] ?? 'other');
  const navigation = [...sections].map(([group, items]) => `
        <li><a href="#${escapeAttribute(group)}">${escapeHtml(config.groups[group] ?? title(group))}</a> (${items.length})</li>`).join('');
  const content = [...sections].map(([group, items]) => `
      <section aria-labelledby="${escapeAttribute(group)}">
        <h2 id="${escapeAttribute(group)}">${escapeHtml(config.groups[group] ?? title(group))}</h2>
        ${items.map(renderSassDocEntry).join('')}
      </section>`).join('');

  await writeFile(resolve(destination, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SassDoc API reference | COCO</title>
  <link rel="stylesheet" href="../assets/coco.css">
  <style>
    body { margin: 0; }
    main { padding-block: 2rem; }
    article { border-block-start: 1px solid #d8d8d8; padding-block: 1rem; }
    pre { overflow: auto; }
    .meta { color: #59636e; }
  </style>
</head>
<body>
  <main class="container">
    <p><a href="../">← Documentation home</a></p>
    <h1>SassDoc API reference</h1>
    <p class="lead">Generated from <code>///</code> comments in the SCSS source.</p>
    <nav aria-label="SassDoc groups"><ul>${navigation}
      </ul></nav>
    ${content}
  </main>
</body>
</html>
`, 'utf8');
}

function renderSassDocEntry(entry) {
  const parameters = entry.parameter?.length ? `
          <h4>Parameters</h4>
          <ul>${entry.parameter.map((parameter) => `<li><code>${escapeHtml(parameter.name)}</code>${parameter.type ? ` {${escapeHtml(parameter.type)}}` : ''}${parameter.default ? ` = <code>${escapeHtml(parameter.default)}</code>` : ''}${parameter.description ? ` — ${escapeHtml(parameter.description)}` : ''}</li>`).join('')}</ul>` : '';
  const result = entry.return ? `<p><strong>Returns:</strong> ${escapeHtml(entry.return.type)}${entry.return.description ? ` — ${escapeHtml(entry.return.description)}` : ''}</p>` : '';
  const outputText = entry.output ? `<p><strong>Output:</strong> ${escapeHtml(entry.output)}</p>` : '';
  const examples = entry.example?.map((example) => `<h4>${escapeHtml(example.description ?? 'Example')}</h4><pre><code>${escapeHtml(example.code)}</code></pre>`).join('') ?? '';
  const line = entry.context?.line?.start ?? entry.commentRange.start;
  return `
        <article id="${escapeAttribute(`${entry.context.type}-${entry.name}`)}">
          <h3><code>${escapeHtml(entry.name ?? entry.context.name)}</code></h3>
          <p class="meta">${escapeHtml(entry.context.type)} · ${escapeHtml(entry.source)}:${line}</p>
          <p>${escapeHtml(entry.description.trim())}</p>${parameters}${result}${outputText}${examples}
        </article>`;
}

function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll(/[^a-zA-Z0-9_-]/g, '-');
}

function title(value) {
  return value === 'undefined' ? 'Other' : value.charAt(0).toUpperCase() + value.slice(1);
}
