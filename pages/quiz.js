import styles from '../styles/Quiz.module.css'
import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import Ques from '../components/Questions'
const db = require('../db')


class Slide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answers_correct: [],
      answers_incorrect:[],
    }
  };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
    };
  //
  addNewItemCorrect = () => {
    let { answers_correct, input } = this.state;
    answers_correct.push(input);
    console.log(this.state.answers_correct)
  };
  addNewItemIncorrect = () => {
    let { answers_incorrect, input } = this.state;
    answers_incorrect.push(input);
    console.log(this.state.answers_incorrect)
  };
  addNewItemSaved = () => {
    let { answers_saved, input } = this.state;
    answers_saved.push(input);
    console.log(this.state.answers_saved)
  };

  render() {
    let array = this.props.quiz_questions
    const questions = array.map((question, index) =>{
      return <Ques q_id={question.id} q_question={question.question} key={index}
      title={question.title} res_a={question.res_a} res_b={question.res_b}
      res_c={question.res_c} res_d={question.res_d} ans={question.ans} clue={question.clue}/>
    })
    return (
      <Carousel className={styles.carousel} >
      <section>
        <h2>{this.props.title}</h2>
        <h1>Begin Quiz!</h1>
      </section>
        {questions}
      <section>
        <h2>{this.props.title}</h2>
        <h1>Finish</h1>
        <p>{this.state.answers_correct}</p>
        <p>{this.state.answers_incorrect}</p>
        <p>{this.props.total}</p>
      </section>
      </Carousel>
    )
};
}

export async function getStaticProps () {
const query = {
  text: "SELECT q.question,q.clue,q.ans,q.res_a,q.res_b,q.res_c,q.res_d,q.id,con.title FROM questions q JOIN concepts con ON q.concept_id = con.id WHERE q.concept_id = $1",
  values:[1],
}

try {
  const res = await db.query(query)
  const quiz_questions = res.rows
  const title = res.rows[0].title
  const total = res.rowCount
  return {
    props: {
      quiz_questions, total, title
    }
  }
} catch (err) {
  console.log(err.stack)
}
}

export default Slide
