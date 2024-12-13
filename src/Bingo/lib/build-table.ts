import type { Table } from '../types.ts'
import { Cell } from '../models/Cell.ts'

import { freeCellIndex, freeCellLabel } from './constants.ts'
import { shuffle } from './shuffle.ts'

export function buildTable(labels: string[], size: number): Table {
  const shuffledLabels = shuffle(labels)
  const centerIndex = Math.floor(shuffledLabels.length / 2)
  shuffledLabels.splice(centerIndex, 0, freeCellLabel)

  return Array.from<Cell[], Cell[]>({ length: size }, (_, i) =>
    Array.from<Cell, Cell>({ length: size }, (_, j) => {
      const isCenterCell = i === freeCellIndex && j === freeCellIndex

      return new Cell(shuffledLabels[i * size + j], isCenterCell)
    })
  )
}
