export function getParentIdChild(id: string, ele: Element | undefined | null): boolean {
  if (!ele)
    return false
  if (ele.id === id)
    return true
  return getParentIdChild(id, ele.parentElement)
}
