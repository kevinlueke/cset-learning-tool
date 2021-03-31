import styles from '../styles/Quiz.module.css'
import {Component} from 'react';
import { useState } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'
import Carousel from 'react-elastic-carousel';
import AnswerFormMC from '../components/AnswerFormMC'
import AnswerFormTF from '../components/AnswerFormTF'
import QuizResults from '../components/QuizResults'
import useUser from '../lib/useUser'
import useCookie from '../lib/useCookie'
const db = require('../db')

export async function getStaticProps () {

  // const router = useRouter()
  // const {qid} = router.query
  const query = {
    text: "SELECT q.question,q.clue,q.ans,q.res_a,q.res_b,q.res_c,q.res_d,q.id,con.title FROM questions q JOIN concepts con ON q.concept_id = con.id WHERE q.concept_id = $1 ORDER BY random() LIMIT $2",
    values:[1,5],
  }

  try {
    const res = await db.query(query)
    const quiz_questions = res.rows
    const title = res.rows[0].title
    return {
      props: {
        quiz_questions, title
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default function QuizCarousel({quiz_questions, title}) {

  const { user } = useUser( { redirectTo: '/' } )
  const { cookie } = useCookie({})

  if (!user || user.isLoggedIn === false || !cookie) {
    return <p>Loading...</p>
  }

  function renderClue(clue){
    if(clue!=null){
    return(
      <aside>
        <h3>Need a hint? Hover!</h3>
        <p>{clue}</p>
      </aside>
    )}
  }

  let this_quiz = []

  const questions = quiz_questions.map((question, index) => {
    //if there is a clue, rendr it
    this_quiz.push(question.id)
    let clue = renderClue(question.clue)

    //if t/f question
    if (question.res_c == null){

      return (<section key={index}><AnswerFormTF id={question.id} question={question.question}
        res_a={question.res_a} res_b={question.res_b} ans={question.ans} user={user.id}/>
        {clue}
        </section>)
    } else {

      //if multiple choice question
      return (<section key={index}><AnswerFormMC id={question.id} question={question.question}
        res_a={question.res_a} res_b={question.res_b} res_c={question.res_c}
        res_d={question.res_d} ans={question.ans} clue={question.clue} user={user.id}/>
        {clue}
        </section>)
    }
  })

  return(

      <Carousel className={styles.carousel} >
      <section>
        <h2>{title}</h2>
        <h1>Begin Quiz, {user.name}!</h1>
      </section>
        {questions}
      <section className={styles.finalCard}>
        <h2>{title}</h2>
        <h1>Finish</h1>
        <QuizResults question_ids={this_quiz} user={user.id}/>
      </section>
      </Carousel>
    )
};
