export function normalizePackManifest(packResult) {
  return Array.isArray(packResult) ? packResult[0] : packResult;
}
