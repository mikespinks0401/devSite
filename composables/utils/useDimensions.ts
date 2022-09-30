export function getHeight(querySelector: string): number {
  const item = document.querySelector(querySelector) as HTMLDivElement
  return item.offsetHeight
}
