import fetchJson from '../lib/fetchJson'
import { Component, useState } from 'react'

export default class QuizResults extends Component{
  constructor(props) {
  super(props);

  this.state = {
      user:props.user,
      question_ids:props.question_ids,
      results:[],
    };
    this.showResults = this.showResults.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  async getResults(){
    const student_id = this.props.user
    const question_ids = this.props.question_ids
    const body = {}

    body.student_id = student_id
    body.question_ids = question_ids

    try {
      await fetch('/api/getresults', {
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


  async showResults (event){
    event.preventDefault()
    await this.getResults()
    }

  setResults(data){
    this.setState ({results: data,},
    ()=>console.log("set results"))
  }

  render(){
    const myResults = this.state.results.map((ques, index) =>{
      if (ques.question_result==true){
      return <div key={index}><p>{ques.question} &#10003;</p></div>
    } else {
      return <div key={index}><p>{ques.question} X</p></div>
    }
  });
  return (
    <div>
    <form  onSubmit={this.showResults}>
    <button type='submit' name='submit'>see results</button>
    </form>
    {myResults}
    </div>

  )
}}
