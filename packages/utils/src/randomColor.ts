import { random } from './random'

/**
 * 生成随机颜色
 * @param opacity 透明度
 */
export function randomColor(opacity: number = 1) {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)},${opacity})`
}
