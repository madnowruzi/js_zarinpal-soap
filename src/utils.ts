export function removeUndefinedKeys(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
}
