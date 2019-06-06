import * as React from 'react';
import s from './Tictactoe.module.scss';
import { TictactoeStore } from './TictactoeStore';

export class Tictactoe extends React.Component {
    store = new TictactoeStore();

    render() {
        return (
            <div className={s.wrapper}>
                <div className={s.table}>
                    {/* <div className={s.row}>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                    </div>
                    <div className={s.row}>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                    </div>
                    <div className={s.row}>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                        <div className={s.cell}></div>
                    </div> */}
                    {this.store.data.length ? this.store.data.map((row, rIndex)=>(
                        <div className={s.row} key={'row' + rIndex}>
                            {row.map((item, cIndex) => (
                                <div 
                                    key={'cell' + cIndex} 
                                    className={`${s.cell} ${this.store.getStyle(rIndex, cIndex)}`} 
                                    onClick={() => this.store.handlerStroke(rIndex, cIndex)}/>
                            ))}
                        </div>
                    )) : null}
                </div>
                <p className={s.message}>Игра окончена!</p>
                <button className={s.btn}>Новая игра</button>
            </div>
        )
    }
}