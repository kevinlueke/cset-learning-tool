import AnswerFormTF from './AnswerFormTF'
import AnswerFormMC from './AnswerFormMC'
import React, { Component } from 'react';

function renderClue(clue){
  if(clue!=null){
  return(
    <aside>
      <h3>Need a hint? Hover!</h3>
      <p>{clue}</p>
    </aside>
  )}
}

export default class Ques extends Component{

  constructor(props) {
    super(props);

    this.state={
      result:false,
    }

  }

  render(){
  const clue = renderClue(this.props.clue)
  if(this.props.res_c==null){
    return (
      <section key ={this.props.id}>
        <h1>{this.props.title}</h1>
        <h2>{this.props.q_question}</h2>
        <AnswerFormTF ques_id={this.props.q_id} res_a={this.props.res_a} res_b={this.props.res_b} answer={this.props.ans}/>
        {clue}
      </section>)

  } else {
    return(
      <section key ={this.props.id}>
      <h1>{this.props.title}</h1>
        <h2>{this.props.q_question}</h2>
        <AnswerFormMC ques_id={this.props.q_id} res_a={this.props.res_a} res_b={this.props.res_b} res_c={this.props.res_c} res_d={this.props.res_d} answer={this.props.ans}/>
        {clue}
      </section>
    )
  }
}
}
