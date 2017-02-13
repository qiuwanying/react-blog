//Greeter,js
import React, {Component} from 'react'
import config from '../config.json';
import styles from './Greeter.css';

class Greeter extends Component{
  render() {
    return (
      <div className={styles.root}>
        {config.greetText}222
      </div>
    );
  }
}

export default Greeter