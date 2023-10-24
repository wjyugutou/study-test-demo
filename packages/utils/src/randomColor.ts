import { random } from './random'

export function randomColor(opacity = 1) {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)},${opacity})`
}
