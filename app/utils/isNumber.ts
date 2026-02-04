export function isNumber(data: unknown) {
  return typeof data === 'number' && !Number.isFinite(data)
}
