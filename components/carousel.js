import styles from '../styles/Quiz.module.css'
// const db = require('../db')
import React from 'react'
import Component from 'react'
import Carousel from 'react-elastic-carousel';
import AnswerFormTF from './AnswerFormTF'
import AnswerFormMC from './AnswerFormMC'

export default function Slide(quiz_questions) {

  function renderClue(clue){
    if(clue!=null){
    return(
      <aside>
        <h3>Need a hint? Hover!</h3>
        <p>{clue}</p>
      </aside>
    )}
  }

  const questions = quiz_questions.map((ques, index) =>{

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
