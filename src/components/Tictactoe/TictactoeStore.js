/**
 * Формат для объекта крестики-нолики
 * [[{name: "cross"|"zero"|null, 
 *    winner: boolean
 *   },{...},{...}],
 *  [{...},{...},{...}],
 *  [{...},{...},{...}]
 * ]
 */

export const Translation = {
  cross: "крестик",
  zero: "нолик"
}

export class TictactoeStore {
  size = 3;
  gameStarted = false;
  whoWalkNow = null;
  mode = "alone";

  /**
   * Формирует новую data с пустыми клетками,
   * основываясь на размере поля size 
   */
  getNullData = () => {
    let data = [];
    if (!this.size) return;
    for (let i = 0; i < this.size; i++) {
      data[i] = [];
      for (let j = 0; j < this.size; j++) {
        data[i][j] = {};
      }
    }
    return data;
  }

  /** Возвращает новый массив с установленным крестиком или ноликом, 
   *  основываясь на том, кто ходил до этого  */
  handlerStroke = (rIndex, cIndex, data, mode) => {
    let newData = deepClone(data);
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.whoWalkNow = 'cross';
      if (mode === "bot") {
        this.mode = "bot"
      } else {
        this.mode = "alone"
      }
    } else {
      this.whoWalkNow = this.whoWalkNow === 'cross' ? 'zero' : 'cross';
    }
    newData[rIndex][cIndex].name = this.whoWalkNow;
    return newData;
  }

  handlerStrokeBot = (data) => {
    let newData = deepClone(data);
    let coord = this.botMove(newData);
    if (coord) {
      let [rI, lI] = coord;
      this.whoWalkNow = 'zero';
      newData[rI][lI].name = this.whoWalkNow;
      return newData;
    }
    return data;
  }

  botMove = (data) => {
    // поиск координаты, в которой бот (нолик) может победить
    let coord = this.coordForWin(data, "zero");
    if (coord) return coord;
    // поиск координаты, в которой игрок (крестик) может проиграть
    coord = this.coordForWin(data, "cross");
    if (coord) return coord;
    // поиск пустой координаты на той же диагонали, строке, ряду, в которую сходил игрок
    // coord = this.coordForWin(data, "cross", 2);
    // if (coord) return coord;
    coord = this.coordForNextMove(data, "cross");
    if (coord) return coord;
    coord = this.botMoveRandom(data);
    return coord;
  }

  /**
   * Ищем координаты для победы, возвращает массив из двух значений
   * [rigthIndex, leftIndex] если есть возможный ход, или null, если нет
   */
  coordForWin = (data, name) => {
    let emptyCellsCount = 1;
    let found = this.searchInFirstDiaronal(data, name, emptyCellsCount);
    if (found) return found;
    found = this.searchInSecondDiaronal(data, name, emptyCellsCount);
    if (found) return found;
    found = this.rowSearch(data, name, emptyCellsCount);
    if (found) return found;
    found = this.columnSearch(data, name, emptyCellsCount);
    return found;
  }
  /**
   * Ищем рандомную координату для хода на тот же ряд, строку или диагональ,
   * на которую сходил игрок. Возвращается [rigthIndex, leftIndex],
   * если есть возможный ход, или null, если нет
   */
  coordForNextMove = (data, name) => {
    let emptyCellsCount = 2;
    let emptyCells = [];
    let found = this.searchInFirstDiaronal(data, name, emptyCellsCount);
    if (found) emptyCells = [...emptyCells, ...found];
    found = this.searchInSecondDiaronal(data, name, emptyCellsCount);
    if (found) emptyCells = [...emptyCells, ...found];
    found = this.rowSearch(data, name, emptyCellsCount);
    if (found) emptyCells = [...emptyCells, ...found];
    found = this.columnSearch(data, name, emptyCellsCount);
    if (found) emptyCells = [...emptyCells, ...found];
    return this.searchRandomItemFromArray(emptyCells);
  }
  /**
   * Проверяем диагональ слева направо 
   * */
  searchInSecondDiaronal = (data, name, emptyCellsCount) => {
    let emptyCells = [];
    for (let i = 0; i < data.length; i++) {
      let elemName = data[data.length - 1 - i][i].name;
      if (elemName && elemName !== name) return null;
      if (!elemName) emptyCells.push([data.length - 1 - i,i]);
    }
    if (emptyCells.length === emptyCellsCount) {
      return emptyCells.length > 1 ? emptyCells :emptyCells[0];
    }
    return null;
  }
  /**
   * Проверяем диагональ справа налево 
   * */
  searchInFirstDiaronal = (data, name, emptyCellsCount) => {
    let emptyCells = [];
    for (let i = 0; i < data.length; i++) {
      let elemName = data[i][i].name;      
      if (elemName && elemName !== name) return null;
      if (!elemName) emptyCells.push([i,i]);
    }
    if (emptyCells.length === emptyCellsCount) {
      return emptyCells.length > 1 ? emptyCells :emptyCells[0];
    }
    return null;
  }

  rowSearch = (data, name, emptyCellsCount) => {
    for (let i = 0; i < data.length; i++) {
      let emptyCells = [];
      for (let j = 0; j < data[i].length; j++) {
        let elemName = data[i][j].name;
        if (elemName && elemName !== name) {
          emptyCells = [];
          break;
        }
        if (!elemName) emptyCells.push([i,j]); 
      }
      if (emptyCells.length === emptyCellsCount) {
        return emptyCells.length > 1 ? emptyCells :emptyCells[0];
      }
    }
    return null;
  }

  columnSearch = (data, name, emptyCellsCount) => {
    for (let i = 0; i < data.length; i++) {
      let emptyCells = [];
      for (let j = 0; j < data[i].length; j++) {
        let elemName = data[j][i].name;
        if (elemName && elemName !== name) {
          emptyCells = [];
          break;
        }
        if (!elemName) emptyCells.push([j,i]); 
      }
      if (emptyCells.length === emptyCellsCount) {
        return emptyCells.length > 1 ? emptyCells :emptyCells[0];
      }
    }
    return null;
  }

  searchRandomItemFromArray = (arr) => {
    if (!arr) return;
    let randomIndex = Math.floor(Math.random() * (arr.length - 0)) + 0;
    return arr[randomIndex];
  }

  botMoveRandom = (data) => {
    let emptyCells = [];
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      for (let j = 0; j < row.length; j++) {
        if (!row[j].name) emptyCells.push([i, j]);
      }
    }
    return this.searchRandomItemFromArray(emptyCells);
  }

  /**
   * Проверка что закончились ходы, 
   * если все клетки заняты, возвращает true, 
   * если есть пустые клетки, возвращает false
   */
  movesOver = (data) => {
    if (!data.length) return false;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (!data[i][j].name) {
          return false;
        };
      }
    }
    return true;
  }

  /**
   * Находит победителя, если не находит - возвращает null,
   * Если находит - возвращает name(его имя)
   */
  getWinner = (data) => {
    if (!data.length) return null;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[i][j].winner) {
          return data[i][j].name;
        };
      }
    }
    return null;
  }
  
  /**
   * Выполняет проверки на победу 
   * и устанавливает клеткам свойство winner в true,
   * если они находятся в ряду победителя
   */
  setWinnerStyle = (data) => {
    let newData = deepClone(data);
    if (!newData.length) return newData;
    let isWinner = false;

    /** Заполнена диагональ слева направо */
    isWinner = this.checkLeftDiagonal(newData);
    if (isWinner) {
      for (let i = 0; i < newData.length; i++) {
        newData[i][i].winner = true;
      }
      return newData;
    }

    /** Заполнен диагональ справа налево */
    isWinner = this.checkRightDiagonal(newData);
    if (isWinner) {
      for (let i = 0; i < newData.length; i++) {
        newData[data.length - 1 - i][i].winner = true;
      }
      return newData;
    }

    /** Заполнен один из рядов по горизонтали */
    for (let i = 0; i < newData.length; i++) {
      isWinner = this.checkRow(newData[i]);
      if (isWinner) {
        for (let j = 0; j < newData[i].length; j++) {
          newData[i][j].winner = true;
        }
        return newData;
      }
    }

    /** Заполнен один из рядов по вертикали */
    let columnIndex = this.findWinnerСolumnIndex(newData);
    isWinner = columnIndex !== -1 ? true : false;
    if (isWinner) {
      for (let i = 0; i < newData.length; i++) {
        newData[i][columnIndex].winner = true;
      }
      return newData;
    }
    return newData;
  }

  checkRow = (data) => {
    if (!data.length) return false;
    let firstElem = data[0].name;
    if (!firstElem) return false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].name !== firstElem) return false;
    }
    return true;
  }

  checkLeftDiagonal = (data) => {
    let firstElem = data[0][0].name;
    if (!firstElem) return false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][i].name !== firstElem) return false;
    }
    return true;
  }

  checkRightDiagonal = (data) => {
    let firstElem = data[data.length - 1][0].name;
    if (!firstElem) return false;
    for (let i = 0; i < data.length; i++) {
      if (data[data.length - 1 - i][i].name !== firstElem) return false;
    }
    return true;
  }

  findWinnerСolumnIndex = (data) => {
    if (!data.length) return -1;

    for (let i = 0; i < data.length; i++) {
      let firstElem = data[0][i].name;
      if (!firstElem) continue;
      let found = true;
      for (let j = 0; j < data.length; j++) {
        if (data[j][i].name !== firstElem) {
          found = false;
          break;
        }
      }
      if (found) {
        return i;
      }
    }
    return -1;
  }

}

export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Array && obj.length) {
    let copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    let copy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key]);
      }
    }
    return copy;
  }
}
