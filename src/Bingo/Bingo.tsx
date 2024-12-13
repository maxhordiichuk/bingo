import { useRef, useState } from 'react'
import classnames from 'classnames'

import { bingoSize, buildTable, freeCellIndex, labels, triggerCellStatus } from './lib'

import styles from './Bingo.module.css'

export default function Bingo(): React.ReactElement {
  const [table, setTable] = useState(() => buildTable(labels, bingoSize))
  const [isAnimating, setIsAnimating] = useState(false)
  const prevBingoCountRef = useRef(0)

  const handleCheck = (row: number, col: number): void => {
    if (row === freeCellIndex && col === freeCellIndex) {
      return
    }

    const newTable = [...table]
    const newBingoCount = triggerCellStatus(newTable, row, col)

    if (newBingoCount > prevBingoCountRef.current) {
      setIsAnimating(true)
    }

    setTable(newTable)
    prevBingoCountRef.current = newBingoCount
  }

  return (
    <div
      className={classnames(styles.table, { [styles.bingoAnimation]: isAnimating })}
      style={{ '--bingo-size': bingoSize } as React.CSSProperties}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {table.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          const isFreeCell = rowIndex === freeCellIndex && colIndex === freeCellIndex

          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={classnames(styles.button, {
                [styles.cellChecked]: cell.checked,
                [styles.cellBingo]: cell.bingo,
                [styles.cellFree]: isFreeCell,
              })
              }
              onClick={() => handleCheck(rowIndex, colIndex)}
              title={cell.text}
              disabled={isFreeCell}
            >
              <span className={styles.positionNumber}>
                {rowIndex * bingoSize + colIndex + 1}
              </span>
              <div className={styles.buttonText}>
                {cell.text}
              </div>
            </button>
          );
        })
      ))}
    </div>
  )
}
