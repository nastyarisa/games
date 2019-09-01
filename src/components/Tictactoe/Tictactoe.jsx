import * as React from 'react';
import s from './Tictactoe.module.scss';
import { TictactoeStore, Translation } from './TictactoeStore';
import { Timer } from "../Timer/Timer";
import {Message} from "../Message/Message";

const ModeTranslate = new Map([
  ["bot", "Сейчас идет игра в режиме бота"],
  ["alone", "Сейчас идет игра в режиме сам с собой"]
])

export class Tictactoe extends React.Component {
  store = new TictactoeStore();
  timerStoped = false;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      time: 0,
      mode: "bot"
    }
  }

  setNullData = () => {
    this.setState({ data: this.store.getNullData() })
  }
  /**
   * Обработка клика на клетку 
   * */
  loading = false;
  handlerStroke = async (rIndex, cIndex) => {
    if (this.loading) return;
    let target = this.state.data[rIndex][cIndex].name;
    if (target) return;
    if (this.gameOver()) return;
    await this.setState((state, props) => {
      let newData = this.store.handlerStroke(rIndex, cIndex, state.data, state.mode);
      newData = this.store.setWinnerStyle(newData);
      return { data: newData }
    });
    if (this.store.mode === "bot" && this.store.whoWalkNow === "cross") {
      if (this.gameOver()) return;
      this.loading = true;
      await setTimeout(() => this.setState((state, props) => {
        let newData = this.store.handlerStrokeBot(state.data);
        newData = this.store.setWinnerStyle(newData);
        return { data: newData }
      }), 200);
      this.loading = false;
    }
  };

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

  /**
   * Проверка, что игра закончилась - заняты все клетки или есть победитель
   */
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
    this.setState({ time: 0 })
  }

  setTimer = () => {
    this.setState((state) => {
      let time = parseInt(state.time);
      return { time: time + 1 }
    })
  }
  modeHandler = () => {
    this.setState((state) => {
      let mode = state.mode === "bot" ? "alone" : "bot";
      return { mode }
    })
  }
  selectMode = () => {
    return (
      <div className={s.radioGroup}>
        <input 
            id="radio_bot"
            type="radio"
            checked={this.state.mode === "bot"} 
            name="mode"
            onChange={this.modeHandler}
          />
        <label htmlFor="radio_bot" className={s.label}>
          С ботом
        </label>
        <input 
            id="radio_alone"
            type="radio" 
            checked={this.state.mode === "alone"} 
            name="mode"
            onChange={this.modeHandler}
          />
        <label htmlFor="radio_alone" className={s.label}>
          Сам с собой
        </label>
      </div>
    )
  }

  messageConfirm = () => {
    this.startNewGame()
  }

  render() {
    let data = this.state.data;
    const message = () => {
      let winner = this.store.getWinner(data);
      if (winner) {
        this.timerStoped = true;
        return `Победил ${Translation[winner]}.`
      }
      if (this.store.movesOver(data)) {    
        this.timerStoped = true;
        return "Закончились ходы."
      }
      return null;
    }
    return (
      <div className={s.wrapper}>
        <div className={s.header}>
          <h1 className={s.title}>Крестики-нолики</h1>
          <div className={s.timer}>
          <Timer
            value={this.state.time}
            onChange={this.setTimer}
            stop={this.timerStoped}
            label={false}
        />
        </div>
        </div>
        <div className={s.content}>
        <div className={s.table}>
          {this.state.data.length ? this.state.data.map((row, rIndex) => (
            <div className={s.row} key={'row' + rIndex}>
              {row.map((item, cIndex) => (
                <div
                  key={'cell' + cIndex}
                  className={`${s.cell} ${this.getStyle(rIndex, cIndex)} 
                                    ${this.getWinnerStyle(rIndex, cIndex)}
                                    `}
                  onClick={() => this.handlerStroke(rIndex, cIndex)} />
              ))}
            </div>
          )) : null}
        </div>
        {this.selectMode()}
        </div>
        <div className={s.footer}>
          <button className={s.btn} onClick={this.startNewGame}>Новая игра</button>
        </div>

        <Message message={message()} confirmationHandler={this.messageConfirm} 
        />
      </div>
    )
  }
}