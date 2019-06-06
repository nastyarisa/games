export class TictactoeStore {
    size = 3;
    data = [];
    gameStarted = false;
    whoWalkNow = null;

    constructor() {
        this.createNullData();
    }
    createNullData = () => {
        if (!this.size) return;
        for (let i = 0; i < this.size; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.data[i][j] = null;
            }
        }
    }

    getNullData = () => {
        let data = [];
        if (!this.size) return;
        for (let i = 0; i < this.size; i++) {
              data[i] = [];
            for (let j = 0; j < this.size; j++) {
              data[i][j] = null;
            }
        }
        return data;
    }

    handlerStroke = (rIndex, cIndex, data) => {
        let newData = copyArray(data);
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.whoWalkNow = 'cross';
        } else {
            this.whoWalkNow = this.whoWalkNow === 'cross' ? 'zero' : 'cross';
        }
        // newData[rIndex][cIndex] = {};
        // newData[rIndex][cIndex].type = this.whoWalkNow;
        newData[rIndex][cIndex] = this.whoWalkNow;
        return newData;
    }

    deadHeat = (data) => {
        if (!data.length) return false;
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            for (let j = 0; j < row.length; j++) {
                if (!row[j]) {
                    return false
                };
            }
        }
        return true;
    }

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

    //Проверяем что в одномерном массиве все элементы одинаковые

    checkRow = (arr) => {
        if (!arr.length) return false;
        let prevElem = arr[0];
        if (!prevElem) return false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== prevElem) return false;
        }
        return true;
    }

    findWinner = (data) => {
        let winner = null;
        if (!data.length) return false;
        //Заполнена диагональ слева направо
        let leftDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            leftDiagonal.push(data[i][i]);
        }
        if (this.checkRow(leftDiagonal)) {
            winner = leftDiagonal[0];
            return winner;
        };
    
        // Заполнен диагональ справа налево
        let rightDiagonal = [];
        for (let i = 0; i < data.length; i++) {
            rightDiagonal.push(data[data.length-1-i][i]);
        }
        if (this.checkRow(rightDiagonal)) {
            winner = rightDiagonal[0];
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
                winner = verticalData[i][0];
                return winner;
            };
        }
    
        // Заполнен один из рядов по горизонтали
        for (let i = 0; i < data.length; i++) {
           if (this.checkRow(data[i])) {
            winner = data[i][0];
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