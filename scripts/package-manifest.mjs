export function normalizePackManifest(packResult) {
  if (Array.isArray(packResult)) return packResult[0];
  if (Array.isArray(packResult?.files)) return packResult;

  const manifests = Object.values(packResult ?? {})
    .filter((value) => Array.isArray(value?.files));
  return manifests.length === 1 ? manifests[0] : undefined;
}
