import styles from '../styles/Quiz.module.css'
import React from 'react'
import Component from 'react'
import Carousel from 'react-elastic-carousel';
import AnswerFormTF from './AnswerFormTF'
import AnswerFormMC from './AnswerFormMC'
const db = require('../db')

export async function getStaticProps () {
  const query = {
    text: 'SELECT * FROM questions WHERE concept_id = $1',
    values:[1],
  }
  const query2 = {
    text:'SELECT title FROM concepts WHERE course_id = $1',
    values:[1],
  }
  try {
    const res = await db.query(query)
    const res2 = await db.query(query2)
    const quiz_title = res2.rows
    const quiz_questions = res.rows
    return {
      props: {
        quiz_questions, quiz_title
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default class Slide extends Component {

  constructor(props) {
  super(props);

  this.state= {
    answers:[]
  };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
    };
  }

  addNewItem = () => {
    let { answers, input } = this.state;
    answers.push(input);
    console.log(this.state.answers)
  };

  render() {

    function renderClue(clue){
      if(clue!=null){
      return(
        <aside>
          <h3>Need a hint? Hover!</h3>
          <p>{clue}</p>
        </aside>
      )}
    const questions = this.props.map((ques, index) =>{
      const clue = renderClue(ques.clue)

      if(ques.res_c==null){

        return (
          <section key={ques.id} id={ques.question}>
            <h2>{ques.question}</h2>
            <AnswerFormTF ques_id={ques.id} res_a={ques.res_a} res_b={ques.res_b} answer={ques.ans}/>
            {clue}
          </section>)

      } else {

        return(
          <section key={ques.id}>
            <h2>{ques.question}</h2>
            <AnswerFormMC ques_id={ques.id} res_a={ques.res_a} res_b={ques.res_b} res_c={ques.res_c} res_d={ques.res_d} answer={ques.ans}/>
            {clue}
          </section>
        )
      }
    })
    return(
      <Carousel className={styles.carousel}>
      {questions}
      </Carousel>
    )
};
}
}
