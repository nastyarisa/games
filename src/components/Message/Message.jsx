import * as React from 'react';
import s from './Message.module.scss';
import {Icon} from "../Icon/Icon"

export class Message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      message: "",
    }
  }

  buttonHandler = (e) => {
    if ( typeof this.props.confirmationHandler === "function") {
      this.props.confirmationHandler()
    }
  }

  render() {
    return (
      this.props.message ?
      <div className={s.wrapper} onClick={this.buttonHandler}>
        <section className={s.container} onClick={(e) => e.stopPropagation()}>
          <Icon name="close" className={s.icon} onClick={this.buttonHandler}/>
          <header className={s.header}>
            Игра окончена!
          </header>
          <main className={s.content}>
            {this.props.message}
          </main>
          <footer className={s.footer}>
            <button className={s.btn} onClick={this.buttonHandler}>Начать заново</button>
          </footer>
        </section>
      </div> : null
    )
  }
}