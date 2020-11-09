const collator = Intl.Collator(undefined, { sensitivity: 'base', numeric: true, caseFirst: 'upper' })
const compareCell = (a: HTMLTableCellElement | null | undefined, b: HTMLTableCellElement | null | undefined) =>
  collator.compare(a?.textContent?.trim() ?? '', b?.textContent?.trim() ?? '')
const createRowComparer = (cellIndex: number, desc: boolean): ((a: HTMLTableRowElement, b: HTMLTableRowElement) => number) =>
  desc ? (a, b) => compareCell(b.cells[cellIndex], a.cells[cellIndex]) : (a, b) => compareCell(a.cells[cellIndex], b.cells[cellIndex])

addEventListener('click', event => {
  const target = (event.target as HTMLElement).closest?.('[data-table-sortable]') as
    | HTMLTableCellElement
    | HTMLTableHeaderCellElement
    | undefined
    | null
  const table = target?.closest('table')
  if (!table) {
    return
  }
  const desc = target!.getAttribute('data-table-sort-order') === 'asc'
  for (const tbody of table.tBodies) {
    tbody.append(...[...tbody.rows].sort(createRowComparer(target!.cellIndex, desc)))
  }
  table.tHead?.querySelector('[data-table-sort-order]')?.removeAttribute('data-table-sort-order')
  target!.setAttribute('data-table-sort-order', desc ? 'desc' : 'asc')
})
