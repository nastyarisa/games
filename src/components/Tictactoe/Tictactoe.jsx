import * as React from 'react';
import s from './Tictactoe.module.scss';
import { TictactoeStore } from './TictactoeStore';
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

    componentDidMount() {
        this.setNullData();
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
            let winner = this.store.findWinner(data);
            if (winner) {
                this.timerStoped = true;
                return <p className={s.message}>Игра окончена! 
                Победил {winner === 'cross' ? 'крестик' : 'нолик'}!</p>
             }
            if (this.store.deadHeat(data)) {
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
                                    className={`${s.cell} ${this.getStyle(rIndex, cIndex)} ${this.store.isWinner(rIndex, cIndex, this.state.data) ? s.winner : ""}`} 
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