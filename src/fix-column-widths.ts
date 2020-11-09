export const fixColumnWidths = (table: HTMLTableElement, { cells }: HTMLTableRowElement) => {
  if (!table.hasAttribute('data-table-column-width-fixed')) {
    for (const cell of cells) {
      cell.style.width = `${cell.offsetWidth}px`
    }
    table.setAttribute('data-table-column-width-fixed', '')
  }
}
