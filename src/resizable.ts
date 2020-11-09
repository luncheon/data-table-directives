import { fixColumnWidths } from './fix-column-widths'

addEventListener('pointerdown', event => {
  const target = (event.target as HTMLElement).closest?.('[data-table-resizable]') as
    | HTMLTableCellElement
    | HTMLTableHeaderCellElement
    | undefined
    | null
  if (!target) {
    return
  }
  const table = target.closest('table')
  if (!table) {
    return
  }
  if (target.getBoundingClientRect().right - event.clientX > parseInt(getComputedStyle(target, ':before').width, 10)) {
    return
  }
  fixColumnWidths(table, target.closest('tr')!)
  const originalClientX = event.clientX
  const originalWidth = target.offsetWidth
  const onPointerMove = (event: PointerEvent) => {
    target.style.width = `${Math.max(1, Math.round(originalWidth + event.clientX - originalClientX))}px`
  }
  const onPointerUp = () => {
    table.removeEventListener('pointermove', onPointerMove)
    table.removeEventListener('pointerup', onPointerUp)
    table.removeEventListener('pointercancel', onPointerUp)
    table.removeAttribute('data-table-resizing')
  }
  table.addEventListener('pointermove', onPointerMove)
  table.addEventListener('pointerup', onPointerUp)
  table.addEventListener('pointercancel', onPointerUp)

  table.setAttribute('data-table-resizing', '')
  table.setPointerCapture(event.pointerId)
})
