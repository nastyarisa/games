import * as React from 'react';
import * as s from "./Timer.module.scss";

/**
 * Timer - компонент отсчитывающий время в формате hh:mm:ss / mm:ss / ss
 * Необязательные props:
 * value: number - время в секундах, целое числовое значение
 * onChange: function - функция, которая будет вызываться с интервалом в 1 секунду
 * stop: boolean - если true, то вызов функции с интервалом останавливается, если false - возобновляется
 * label: boolean - если false - не будет показываться "Время: "
 */

export class Timer extends React.Component {
  timer;
  timerWasStoped = false;

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    }
  }

  componentDidMount() {
    this.setTimer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stop) {
      clearInterval(this.timer);
      return false;
    }
    if (nextProps.stop === false && this.props.stop === true) {
      this.setTimer();
    }
    return true;
  }

  clearTimer = () => {
    clearInterval(this.timer);
    this.setState({ time: 0 })
  }

  setTimer = () => {
    if (this.props.onChange && typeof this.props.onChange === "function") {
      this.timer = setInterval(this.props.onChange, 1000);
      return;
    }
    this.timer = setInterval(() => this.setState((state) => {
      let time = parseInt(state.time);
      return { time: time + 1 }
    }), 1000)
  }

  getTime = (value) => {
    let seconds, minutes, hours;
    seconds = value;
    if (value >= 60) {
      minutes = parseInt(value / 60);
      seconds = value - (minutes * 60);
    }
    if (minutes >= 60) {
      hours = parseInt(minutes / 60);
      minutes = minutes - (hours * 60);
    }

    let str;
    if (hours) {
      str = `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    } else if (minutes) {
      str = `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    } else {
      str = `${seconds}`
    }
    return str;
  }

  render() {
    return (
      <div className={s.timer}>
        {this.props.label ? "Время:" : null}
        {this.getTime(this.props.value ? this.props.value : this.state.time)}
      </div>
    )
  }
}