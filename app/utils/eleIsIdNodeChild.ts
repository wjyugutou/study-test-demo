/**
 * 是否有同等id的祖先节点
 * @returns boolean
 */
export function eleIsIdNodeChild(id: string, ele: Element | undefined | null): boolean {
  if (!ele)
    return false
  if (ele.id === id)
    return true
  return eleIsIdNodeChild(id, ele.parentElement)
}
