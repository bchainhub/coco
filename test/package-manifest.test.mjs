import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalizePackManifest } from '../scripts/package-manifest.mjs';

describe('normalizePackManifest()', () => {
  const manifest = {
    files: [{ path: 'dist/coco.css' }],
    name: '@blockchainhub/coco',
  };

  it('accepts the npm 12 package-keyed object format', () => {
    assert.deepEqual(normalizePackManifest({
      '@blockchainhub/coco': manifest,
    }), manifest);
  });

  it('accepts the npm 11 array format', () => {
    assert.deepEqual(normalizePackManifest([manifest]), manifest);
  });

  it('accepts a direct manifest object', () => {
    assert.deepEqual(normalizePackManifest(manifest), manifest);
  });

  it('rejects output without exactly one package manifest', () => {
    assert.equal(normalizePackManifest({}), undefined);
    assert.equal(normalizePackManifest({ first: manifest, second: manifest }), undefined);
  });
});
