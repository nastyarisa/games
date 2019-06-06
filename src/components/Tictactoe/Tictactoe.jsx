import * as React from 'react';
import s from './Tictactoe.module.scss';
import { TictactoeStore } from './TictactoeStore';

export class Tictactoe extends React.Component {
    store = new TictactoeStore();
     
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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

    componentDidMount() {
        this.setNullData();
    }

    render() {
        let data = this.state.data;
        const message = () => {
            let winner = this.store.findWinner(data);
            if (this.store.deadHeat(data)) {
               return <p className={s.message}>Игра окончена! Закончились ходы.</p>
            }
            if (winner) {
                return <p className={s.message}>Игра окончена! 
                Победил {winner === 'cross' ? 'крестик' : 'нолик'}!</p>
             }
            return null;
        }
        return (
            <div className={s.wrapper}>
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
                <button className={s.btn} onClick={this.setNullData}>Новая игра</button>
            </div>
        )
    }
}