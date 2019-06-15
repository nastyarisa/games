import * as React from 'react';
import s from './Tictactoe.module.scss';
import {TictactoeStore, Translation} from './TictactoeStore';
import {Timer} from "../Timer/Timer";

export class Tictactoe extends React.Component {
    store = new TictactoeStore();
    timerStoped = false;
     
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
        let target = this.state.data[rIndex][cIndex].name;
        if (target) return;
        if (this.gameOver()) {
            return;
        }
        this.setState((state, props) => {
            let newData = this.store.handlerStroke(rIndex, cIndex, state.data);
            newData = this.store.setWinnerStyle(newData);
            return {data: newData}
        });
    }

    componentDidMount() {
        this.setNullData();
    }

    getStyle = (rIndex, cIndex) => {
        let name = this.state.data[rIndex][cIndex].name;
        if (!name) return "";
        return s[name];
    }

    getWinnerStyle = (rIndex, cIndex) => {
        let isWinner = this.state.data[rIndex][cIndex].winner;
        if (!isWinner) return "";
        return s.winner;
    }

    gameOver = () => {
        let data = this.state.data;
        if (this.store.movesOver(data) || this.store.getWinner(data)) {
            return true;
        }
        return false; 
    }

    startNewGame = () => {
        this.setNullData();
        this.store.gameStarted = false;
        this.store.whoWalkNow = null;
        this.clearTimer();
    }

    clearTimer = () => {
        this.timerStoped = false;
        this.setState({time: 0})
    } 

    setTimer = () => {
        this.setState((state) => {
            let time = parseInt(state.time);
            return {time: time + 1}
        })
    }

    render() {
        let data = this.state.data;
        const message = () => {
            let winner = this.store.getWinner(data);
            if (winner) {
                this.timerStoped = true;
                return <p className={s.message}>Игра окончена! 
                Победил {Translation[winner]}!</p>
             }
            if (this.store.movesOver(data)) {
                this.timerStoped = true;
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
                                    className={`${s.cell} ${this.getStyle(rIndex, cIndex)} 
                                    ${this.getWinnerStyle(rIndex, cIndex)}
                                    `} 
                                    onClick={() => this.handlerStroke(rIndex, cIndex)}/>
                            ))}
                        </div>
                    )) : null}
                </div>
                <Timer 
                    value={this.state.time} 
                    onChange={this.setTimer}
                    stop={this.timerStoped}
                 />
                {message()}
                <button className={s.btn} onClick={this.startNewGame}>Новая игра</button>
            </div>
        )
    }
}