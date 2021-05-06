import styles from '../styles/Quiz.module.css'
import {Component} from 'react';
import { useState } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'
import Carousel from 'react-elastic-carousel';
import AnswerFormMC from './AnswerFormMC'
import AnswerFormTF from './AnswerFormTF'
import QuizResults from './QuizResults'
import useUser from '../lib/useUser'
import useCookie from '../lib/useCookie'

export default class QuizCarousel extends Component {

  constructor(props){
    super(props);
    this.state = {
      cid: props.cid,
      title:props.title,
      username:props.username,
      userid: props.userid,
      no_ques: 1,
      questions:[],
      question_box:'block',
      final_card:'none',
    };

    // this.addQuestion = this.addQuestion.bind(this)
    this.showQuiz = this.showQuiz.bind(this)
    this.setResults = this.setResults.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.hideQuesBox = this.hideQuesBox.bind(this)
    this.showFinalCard = this.showFinalCard.bind(this)
  }

  hideQuesBox(){
    this.setState({ question_box:'none',},
    ()=>console.log('box display', this.state.question_box))
  }

  showFinalCard(){
    this.setState({ final_card:'flex',},
    ()=>console.log('finalCard display', this.state.final_card))
  }

  setResults(data){
    this.setState ({questions: data,},
    ()=>console.log("set questions"))
  }

  onValueChange(event) {
    this.setState({
      no_ques: event.target.value
    });
  }

  async getQuiz(){
    this.hideQuesBox()
    this.showFinalCard()
    const cid = this.state.cid
    const no_ques = this.state.no_ques
    const body = {}

    body.cid = cid
    body.no_ques = no_ques

    try {
      await fetch('/api/getquiz', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      }).then(result => result.json())
        .then(data => {
          this.setResults(data)
        })
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  async showQuiz (event){
    event.preventDefault()
    await this.getQuiz()
  }

  render(){

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
  const questions = this.state.questions.map((question, index) => {
    //if there is a clue, rendr it
    this_quiz.push(question.id)
    let clue = renderClue(question.clue)

    //if t/f question
    if (question.res_c == null){

      return (<section key={index}><AnswerFormTF id={question.id} question={question.question}
        res_a={question.res_a} res_b={question.res_b} ans={question.ans} user={this.state.userid}/>
        {clue}
        </section>)
    } else {

      //if multiple choice question
      return (<section key={index}><AnswerFormMC id={question.id} question={question.question}
        res_a={question.res_a} res_b={question.res_b} res_c={question.res_c}
        res_d={question.res_d} ans={question.ans} clue={question.clue} user={this.state.userid}/>
        {clue}
        </section>)
    }
  })

  return(
    <article>
      <Carousel className={styles.carousel} >
      <section className={styles.box}>
        <div style={{display:this.state.question_box}}>
        <form onSubmit={this.showQuiz}>
        <label id={styles.no_ques_label} htmlFor='no_ques'>Choose the number of quiz questions</label>
        <input
        id={styles.no_ques}
        type="number"
        min="1"
        max="10"
        value={this.state.no_ques}
        onChange={this.onValueChange}
        />
        <button type='submit' name='submit'>get quiz</button>
        </form>
        </div>
        <div id={styles.startcard} style={{display:this.state.final_card}}>
        <h3>Start the quiz, {this.state.username}!</h3>
        <ul>
        <li>Use arrow buttons or dots at bottom of each card to navigate between questions.</li>
        <li>Click 'answer' button to submit your answer.</li>
        <li>Check the 'save question' box if you would like to use the question later in a custom built quiz.</li>
        </ul>
        </div>
      </section>

        {questions}
      <section className={styles.finalCard} style={{display:this.state.final_card}}>
        <p>If you skipped any questions, your most recent answer to the question will be displayed, if available.</p>
        <h3>When done, click to see results</h3>
        <QuizResults question_ids={this_quiz} user={this.state.userid}/>
      </section>
      </Carousel>
      </article>
    )}
};
