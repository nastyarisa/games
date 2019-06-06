import {computed} from 'mobx';

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
        console.log('data', this.data)
    }

    handlerStroke = (rIndex, cIndex) => {
        let target = this.data[rIndex][cIndex];
        console.log('target', target);
    }

    getStyle = (rIndex, cIndex) => {
        let target = this.data[rIndex][cIndex];
        if (!target) return "";
        return target;
    }

    @computed
    get checkVictory() {
        let victory = false;
        // Заполнена диагональ слева направо
        let leftDiagonal = [];
        this.data.forEach((item, index) => {
            leftDiagonal.push(item[index]);
        })
        let item = leftDiagonal[0];
        victory = item ? leftDiagonal.every((cell) => {  
            return cell === item;
        }) : false;
        if (victory) return victory;
    
        // Заполнен диагональ справа налево
        let rightDiagonal = [];
        this.data.reverse().forEach((item, index) => {
            rightDiagonal.push(item[index]);
        })
        item = rightDiagonal[0];
        victory = item ? rightDiagonal.every((cell) => {  
            return cell === item;
        }) : false;
        if (victory) return victory;
    
        // Проверка вертикали
        let verticalData = [[],[],[]];
        this.data.forEach((row, index, arr)=>{
            if (victory) return;
            for (let i = 0; i < row.length; i++) {
                verticalData[i][index] = row[i]
            }
        });
        checkRows(verticalData);
        if (victory) return victory;
    
        // Заполнен один из рядов по горизонтали
        checkRows(this.data);
        if (victory) return victory;
    
        function checkRows(arr) {
            arr.forEach((row, index, arr) => {
                if (victory) return;
                let item = row[0];
                if (!item) return;
                victory = row.every((cell) => {  
                    return cell === item;
                })
            });
        }
    }
}