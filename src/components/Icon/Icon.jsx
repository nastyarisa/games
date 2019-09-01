import * as React from 'react';
import s from './Icon.module.scss';

export class Icon extends React.Component {
  render() {
    return (
      <i className={`${s[this.props.name]} ${this.props.className}`}></i>
    )
  }
}