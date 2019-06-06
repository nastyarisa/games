import * as React from 'react';
import s from './Tictactoe.module.scss';
import { TictactoeStore } from './TictactoeStore';

export class Tictactoe extends React.Component {
    store = new TictactoeStore();
    timer;
     
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            time: "0",
        }
    }

    setNullData = () => {
        this.setState({data: this.store.getNullData()})
    }

    handlerStroke = (rIndex, cIndex) => {
        let target = this.state.data[rIndex][cIndex];
        if (target) return;
        if (this.gameOver()) {
            return;
        }
        this.setState((state, props) => {
            let data = state.data;
            return {data: this.store.handlerStroke(rIndex, cIndex, data)}
        });
    }

    getStyle = (rIndex, cIndex) => {
        let target = this.state.data[rIndex][cIndex];
        if (!target) return "";
        return s[target];
    }

    gameOver = () => {
        let data = this.state.data;
        if (this.store.deadHeat(data)) {
            return true;
        }
        if (this.store.isVictory(data)) return true;
        return false; 
    }

    startNewGame = () => {
        this.setNullData();
        this.store.gameStarted = false;
        this.store.whoWalkNow = null;
        this.clearTimer();
        this.setTimer();
    }

    clearTimer = () => {
        clearInterval(this.timer);
        this.setState({time: "0"})
    } 

    componentDidMount() {
        this.setNullData();
        this.setTimer();
    }

    setTimer = () => {
        this.timer = setInterval(() => this.setState((state) => {
            let time = state.time.split(':');
            let newTime = [];         
            let seconds = time[time.length-1];
            let minutes, hour;
            if (time.length > 1) {
                minutes = time[time.length - 2];
            } 
            if (time.length > 2) {
                hour = time[time.length - 3];
            } 
            
            if (minutes === '59' && seconds === '59') {
                hour = hour ? String(+hour + 1) : '1';
                minutes = '0';
                seconds = '0';
            }
            if (seconds === '59') {
                minutes = minutes ? String(+minutes + 1) : '1';
                seconds = '0';
            } else {
                seconds = String(+seconds + 1);
            }

            if (hour) {
                newTime.push(hour);
            }
            if (minutes) {
                newTime.push(minutes.length > 1 ? minutes : '0' + minutes);
            }
            newTime.push(seconds.length > 1 ? seconds : '0' + seconds);

            let finalTime = newTime.join(':');
            return {time: finalTime}
        }), 1000)
    }

    render() {
        let data = this.state.data;
        const message = () => {
            let winner = this.store.findWinner(data);
            if (winner) {
                clearInterval(this.timer);
                return <p className={s.message}>Игра окончена! 
                Победил {winner === 'cross' ? 'крестик' : 'нолик'}!</p>
             }
            if (this.store.deadHeat(data)) {
                clearInterval(this.timer);
               return <p className={s.message}>Игра окончена! Закончились ходы.</p>
            }
            return null;
        }
        return (
            <div className={s.wrapper}>
                <div className={s.timer}>Время: {this.state.time}</div>
                <div className={s.table}>
                    {this.store.data.length ? this.state.data.map((row, rIndex)=>(
                        <div className={s.row} key={'row' + rIndex}>
                            {row.map((item, cIndex) => (
                                <div 
                                    key={'cell' + cIndex} 
                                    className={`${s.cell} ${this.getStyle(rIndex, cIndex)}`} 
                                    onClick={() => this.handlerStroke(rIndex, cIndex)}/>
                            ))}
                        </div>
                    )) : null}
                </div>
                {message()}
                <button className={s.btn} onClick={this.startNewGame}>Новая игра</button>
            </div>
        )
    }
}