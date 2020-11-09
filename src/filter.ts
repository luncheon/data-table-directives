import { fixColumnWidths } from './fix-column-widths'

const collator = Intl.Collator(undefined, { sensitivity: 'base', usage: 'search' })

const includes = (s: string | null | undefined, word: string | null | undefined) => {
  if (!word) {
    return 1
  }
  if (!s) {
    return
  }
  for (let i = 0; i <= s.length - word.length; i++) {
    if (collator.compare(s.substr(i, word.length), word) === 0) {
      return 1
    }
  }
}

const onChange = (event: Event & { target: HTMLInputElement | HTMLSelectElement }) => {
  const inputElement = event.target
  if (!inputElement.closest('[data-table-filter]')) {
    return
  }
  const cellIndex = (inputElement.closest('th,td') as HTMLTableCellElement | HTMLTableHeaderCellElement | null)?.cellIndex
  const table = inputElement.closest('table')
  if (cellIndex == null || !table) {
    return
  }
  fixColumnWidths(table, inputElement.closest('tr')!)
  const attributeHiddenBy = 'data-table-row-hidden-by'
  for (const tbody of table.tBodies) {
    for (const row of tbody.rows) {
      const hiddenBy: (string | number)[] = row.getAttribute(attributeHiddenBy)?.split(',') ?? []
      const cellIndexIndex = hiddenBy.indexOf(String(cellIndex))
      if (includes(row.cells[cellIndex].textContent, inputElement.value)) {
        if (cellIndexIndex !== -1) {
          hiddenBy.splice(cellIndexIndex, 1)
          if (hiddenBy.length === 0) {
            row.removeAttribute(attributeHiddenBy)
          } else {
            row.setAttribute(attributeHiddenBy, hiddenBy.join(','))
          }
        }
      } else {
        if (cellIndexIndex === -1) {
          hiddenBy.push(cellIndex)
          row.setAttribute(attributeHiddenBy, hiddenBy.join(','))
        }
      }
    }
  }
}

addEventListener(
  'input',
  event => event.target instanceof HTMLInputElement && onChange(event as typeof event & { target: HTMLInputElement }),
)

addEventListener(
  'change',
  event => event.target instanceof HTMLSelectElement && onChange(event as typeof event & { target: HTMLSelectElement }),
)
