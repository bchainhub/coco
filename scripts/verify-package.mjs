import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { normalizePackManifest } from './package-manifest.mjs';

const root = resolve(import.meta.dirname, '..');
const packageData = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const errors = [];
const expectedRepository = 'git+https://github.com/bchainhub/coco.git';

if (packageData.repository?.url !== expectedRepository) {
  errors.push(`repository.url must be ${expectedRepository} for npm provenance.`);
}

for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
  if (packageData[field] && Object.keys(packageData[field]).length) {
    errors.push(`${field} must be empty for the CSS-only package.`);
  }
}

for (const field of ['main', 'module', 'browser', 'bin', 'engines']) {
  if (packageData[field]) {
    errors.push(`${field} creates a runtime or JavaScript package requirement.`);
  }
}

const pack = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: root,
  encoding: 'utf8',
});

if (pack.status !== 0) {
  errors.push(`npm pack failed: ${pack.stderr.trim()}`);
} else {
  const packResult = JSON.parse(pack.stdout);
  const manifest = normalizePackManifest(packResult);

  if (!manifest?.files || !Array.isArray(manifest.files)) {
    errors.push('npm pack returned an invalid package manifest.');
  }

  const allowedFiles = /^(?:dist\/[^/]+\.css|LICENSE|README\.md|package\.json)$/;
  const unexpectedFiles = (manifest?.files ?? [])
    .map((file) => file.path)
    .filter((file) => !allowedFiles.test(file));

  if (unexpectedFiles.length) {
    errors.push(`Unexpected published files: ${unexpectedFiles.join(', ')}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('Verified CSS-only package: no runtime dependencies or JavaScript.');
