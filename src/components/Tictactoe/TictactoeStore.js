/**
 * Формат для объекта крестики-нолики
 * [[{name: "cross"|"zero"|null, winner: boolean},{},{}],[{},{},{}],[{},{},{}]]
 */

export class TictactoeStore {
    size = 3;
    gameStarted = false;
    whoWalkNow = null;

    // создает пустой двумерный массив с объектами - инициализация или обнуление
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

    // устанавливает в клетку клона массива крестик или нолик, возвращает новый массив
    handlerStroke = (rIndex, cIndex, data) => {
        console.log('data', data);
        let newData = deepClone(data);
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.whoWalkNow = 'cross';
        } else {
            this.whoWalkNow = this.whoWalkNow === 'cross' ? 'zero' : 'cross';
        }
        newData[rIndex][cIndex].name = this.whoWalkNow;
        return newData;
    }

    //проверяет что свободных клеток больше нет - закончились ходы
    deadHeat = (data) => {
        if (!data.length) return false;
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            for (let j = 0; j < row.length; j++) {
                if (!row[j].name) {
                    return false
                };
            }
        }
        return true;
    }

    //проверяет есть ли победитель fixme
    isVictory = (data) => {
        let victory = false;
        if (!data.length) return false;
        //Заполнена диагональ слева направо
        let leftDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            leftDiagonal.push(data[i][i]);
        }
        if (this.checkRow(leftDiagonal)) victory = true;
    
        // Заполнен диагональ справа налево
        let rightDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            rightDiagonal.push(data[data.length-1-i][i]);
        }
        if (this.checkRow(rightDiagonal)) victory = true;
    
        // Заполнен один из рядов по вертикали
        let verticalData = [[],[],[]];
        data.forEach((row, index)=>{
            // if (victory) return;
            for (let i = 0; i < row.length; i++) {
                verticalData[i][index] = row[i]
            }
        });
        for (let i = 0; i < verticalData.length; i++) {
            if (this.checkRow(verticalData[i])) victory = true;
        }
    
        // Заполнен один из рядов по горизонтали
        for (let i = 0; i < data.length; i++) {
           if (this.checkRow(data[i])) victory = true;
        }
        return victory;
    }

    //Проверяем что в одномерном массиве все свойства name вложенных одинаковые

    checkRow = (arr) => {
        if (!arr.length) return false;
        let prevElem = arr[0].name;
        if (!prevElem) return false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name !== prevElem) return false;
        }
        return true;
    }

    //проверяет что клетка является победителем fixme
    isWinner = (rIndex, cIndex, data) => {
        let isWinner = false;
        if (!data.length) return false;
    
        //Заполнена диагональ слева направо
        let found = false;
        let leftDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            if (rIndex === i && cIndex === i) {
                found = true;
            }
            leftDiagonal.push(data[i][i]);
        }
        if (this.checkRow(leftDiagonal) && found) {
            isWinner = true;
        };

        // Заполнен диагональ справа налево
        let foundR = false;
        let rightDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            if (rIndex === data.length-1-i && cIndex === i) {
                foundR = true;
            }
            rightDiagonal.push(data[data.length-1-i][i]);
        }
        if (this.checkRow(rightDiagonal) && foundR) {
            isWinner = true;
        }

        // Заполнен один из рядов по вертикали
        // let foundV = false;
        // let verticalData = [[],[],[]];
        // data.forEach((row, index) => {
        //     for (let i = 0; i < row.length; i++) {
        //         verticalData[i][index] = row[i]
        //         if (rIndex === i && cIndex === index) {
        //             foundV = true
        //         }
        //     }
        // });
        // for (let i = 0; i < verticalData.length; i++) {
        //     if (this.checkRow(verticalData[i]) && foundV) {
        //         isWinner = true;
        //     }
        // }
    
        // Заполнен один из рядов по горизонтали
        let foundH = false;
        for (let i = 0; i < data.length; i++) {
            if (this.checkRow(data[i])) {
                for (let j = 0; j < data[i].length; j++) {
                    if (rIndex === i && cIndex === j) {
                        foundH = true
                    }
                }
                if (foundH) {
                    isWinner = true;
                }
            }
        }

        return isWinner;
    }

    //выводит имя победителя fixme
    findWinner = (data) => {
        let winner = null;
        if (!data.length) return false;
        //Заполнена диагональ слева направо
        let leftDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            leftDiagonal.push(data[i][i]);
        }
        if (this.checkRow(leftDiagonal)) {
            winner = leftDiagonal[0].name;
            return winner;
        };
    
        // Заполнен диагональ справа налево
        let rightDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            rightDiagonal.push(data[data.length-1-i][i]);
        }
        if (this.checkRow(rightDiagonal)) {
            winner = rightDiagonal[0].name;
            return winner;
        };
    
        // Заполнен один из рядов по вертикали
        let verticalData = [[],[],[]];
        data.forEach((row, index)=>{
            for (let i = 0; i < row.length; i++) {
                verticalData[i][index] = row[i]
            }
        });
        for (let i = 0; i < verticalData.length; i++) {
            if (this.checkRow(verticalData[i])) {
                winner = verticalData[i][0].name;
                return winner;
            };
        }
    
        // Заполнен один из рядов по горизонтали
        for (let i = 0; i < data.length; i++) {
           if (this.checkRow(data[i])) {
            winner = data[i][0].name;
            return winner;
           };
        }
        return winner;
    }
}

function copyArray(arr) {
    if (arr instanceof Array) {
        let copy = [];
        for (let i = 0; i < arr.length; i++) {
            copy[i] = copyArray(arr[i]);
        }
        return copy;
    }
    return arr;
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
  