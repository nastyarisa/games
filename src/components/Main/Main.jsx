import * as React from 'react';
import s from './Main.module.scss';
import { Tictactoe } from '../Tictactoe/Tictactoe';

export class Main extends React.Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Tictactoe />
      </div>
    )
  }
}