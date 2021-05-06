import styles from '../styles/QuizBox.module.css'
import {useState,Component} from 'react';
import Link from 'next/link'

export default class MakeQuiz extends Component{
  constructor(props) {
  super(props);

  this.state = {
    concept: props.concept_id,
    name: props.name,
    value:5,
  };

  this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
  this.setState({
    value: event.target.value
  });
}

render (){

  return (
    <form>
    <h1>{this.state.concept}</h1>
    <h1>{this.state.name}</h1>

    <div className={styles.slidecontainer}>

    <label for="no_ques">Number of Questions</label>
      <input
        id="no_ques"
        type="range"
        min="0" max="20"
        value={this.state.value}
        onChange={this.handleChange}
        step="1"/>

    <output for="no_ques" id="amount">{this.state.value}</output>

    </div>

    <Link href="/">
     <a>Take Quiz</a>
    </Link>


    </form>
  )
}

}
