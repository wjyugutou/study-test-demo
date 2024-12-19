export function random(start = 1, end = 9) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}
