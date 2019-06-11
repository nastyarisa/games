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
            time: 0,
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
        this.setState({time: 0})
    } 

    componentDidMount() {
        this.setNullData();
        this.setTimer();
    }


    setTimer = () => {
        this.timer = setInterval(() => this.setState((state) => {
            let time = parseInt(state.time);
            return {time: time + 1}
        }), 1000)
    }

    getTime = (value) => {
        let seconds, minutes, hours;
        seconds = value;
        if (value >= 60) {
            minutes = parseInt(value/60);
            seconds = value - (minutes*60);
        }
        if (minutes >= 60) {
            hours = parseInt(minutes/60);
            minutes = minutes - (hours*60);
        }
        
        let str;
        if (hours) {
            str = `${hours}:${minutes > 9 ? minutes: '0' + minutes}:${seconds > 9 ? seconds: '0' + seconds}`
        } else if (minutes) {
            str = `${minutes}:${seconds > 9 ? seconds: '0' + seconds}`
        } else {
            str = `${seconds}`
        }
        return str;
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
                <h1 className={s.title}>Крестики-нолики</h1>
                <div className={s.table}>
                    {this.state.data.length ? this.state.data.map((row, rIndex)=>(
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
                <div className={s.timer}>Время: {this.getTime(this.state.time)}</div>
                {message()}
                <button className={s.btn} onClick={this.startNewGame}>Новая игра</button>
            </div>
        )
    }
}