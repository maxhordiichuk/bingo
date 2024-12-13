export class Cell {
  constructor(public text: string, public checked = false, public bingo = false) {}

  copy() {
    return new Cell(this.text, this.checked, this.bingo)
  }
}
