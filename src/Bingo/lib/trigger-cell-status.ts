import type { Table } from '../types.ts'
import { bingoSize } from './constants.ts'

function generateBingoIndices(size: number): number[][][] {
  const rowIndices = [...Array(size).keys()].map((i) => {
    return [...Array(size).keys()].map((j) => [i, j]);
  })

  const colIndices = [...Array(size).keys()].map((i) => {
    return [...Array(size).keys()].map((j) => [j, i]);
  })

  const diag1Indices = [...Array(size).keys()].map((i) => [i, i])

  const diag2Indices = [...Array(size).keys()].map((i) => [i, size - i - 1])

  return [...rowIndices, ...colIndices, diag1Indices, diag2Indices]
}

const allBingoIndices = generateBingoIndices(bingoSize)

function getBingoPositions(table: Table): number[][][] {
  return allBingoIndices.filter((indices) => isBingo(table, indices))
}

function isBingo(table: Table, indices: number[][]): boolean {
  return indices.every(([row, col]) => table[row][col].checked)
}

function updateBingoTable(table: Table, positions: number[][][], resetBingo = false): void {
  if (resetBingo) {
    table.forEach((row) => {
      row.forEach((cell) => {
        cell.bingo = false
      })
    })
  }

  positions.forEach((batch) => {
    batch.forEach(([row, col]) => {
      table[row][col].bingo = true
    })
  })
}


export function triggerCellStatus(table: Table, row: number, col: number): number {
  table[row] = table[row].map((cell, index) => {
    if (index === col) {
      const newCell = cell.copy()
      newCell.checked = !cell.checked

      return newCell
    }

    return cell
  })

  const cell = table[row][col]
  const bingoPositions = getBingoPositions(table)

  updateBingoTable(table, bingoPositions, !cell.checked)

  return bingoPositions.length
}
