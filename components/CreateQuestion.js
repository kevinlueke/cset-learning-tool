import {useState,Component} from 'react';
import styles from '../styles/NewQuestionForm.module.css'

export default class CreateQuestion extends Component {

  constructor(props) {
  super(props);

  this.state = {
    cid:this.props.cid,
    question:null,
    clue:null,
    res_a:null,
    res_b:null,
    res_c:null,
    res_d:null,
    answer:null,
    answer_error:null,
    };

    this.onCidChange = this.onCidChange.bind(this);
    this.onQuesChange = this.onQuesChange.bind(this);
    this.onClueChange = this.onClueChange.bind(this);
    this.onresAChange = this.onresAChange.bind(this);
    this.onresBChange = this.onresBChange.bind(this);
    this.onresCChange = this.onresCChange.bind(this);
    this.onresDChange = this.onresDChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.saveNewQuestion = this.saveNewQuestion.bind(this);
  }

  handleUpdate(){
    this.props.onUpdate()
  //   this.setState({
  //     question:'',
  //     clue:'',
  //     res_a:'',
  //     res_b:'',
  //     res_c:'',
  //     res_d:'',
  //     answer:''
  //   },
  // ()=>console.log('clear the question form', this.state.question, this.state.res_a))
  //   console.log("now this")
  }

  onCidChange(event) {
    this.setState({
      cid: event.target.value,})
  }

  onQuesChange(event) {
    this.setState({
      question: event.target.value,})
  }

  onClueChange(event) {
    this.setState({
      clue: event.target.value,})
  }

  onresAChange(event) {
    this.setState({
      res_a: event.target.value,})
  }

  onresBChange(event) {
    this.setState({
      res_b: event.target.value,})
  }

  onresCChange(event) {
    this.setState({
      res_c: event.target.value
    });
  }

  onresDChange(event) {
    this.setState({
      res_d: event.target.value
    });
  }

  onAnswerChange(event) {
    this.setState({
      answer: event.target.value,},
    ()=>console.log('answer = ', this.state.answer))
  }

  checkAnswer(){
    if (this.state.answer == this.state.res_a || this.state.answer == this.state.res_b || this.state.answer == this.state.res_c || this.state.answer == this.state.res_d){
      return true
    } else {
      return false
    }
  }

  async saveNewQuestion(event){
    event.preventDefault();
    let pass = this.checkAnswer()
    if (pass == true){
      this.setState({
        answer_error: null},
      ()=>console.log('no error'))
      const cid = this.props.cid
      const question = this.state.question
      const ans = this.state.answer
      const clue = this.state.clue
      const res_a = this.state.res_a
      const res_b = this.state.res_b
      const res_c = this.state.res_c
      const res_d = this.state.res_d
      const body = {}

      body.cid = cid
      body.question = question
      body.clue = clue
      body.ans = ans
      body.res_a = res_a
      body.res_b = res_b
      body.res_c = res_c
      body.res_d = res_d

      const response = await fetch('/api/savenewquestion', {
        method:'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      console.log(response)
      this.handleUpdate()
      event.target.reset()

    }else{
      this.setState({
        answer_error: 'answer does not match a selection'},
      ()=>console.log('error'))
    }
  }

  render(){

    return(
      <form onSubmit={this.saveNewQuestion} className={styles.main}>
      <label htmlFor="question">New question:</label>
      <input
      type="text"
      name="question"
      id="question"
      required={true}
      onChange={this.onQuesChange}
      placeholder="Enter question (required)"
      />
      <label htmlFor="clue">Question clue:</label>
      <input
      type="text"
      name="clue"
      id="clue"
      onChange={this.onClueChange}
      placeholder="Enter clue"
      />
      <label htmlFor="res_a">First option:</label>
      <input
      type="text"
      name="res_a"
      id="res_a"
      required={true}
      onChange={this.onresAChange}
      placeholder="Enter first option (required)"
      />
      <label htmlFor="res_b">Second option:</label>
      <input
      type="text"
      name="res_b"
      id="res_b"
      required={true}
      onChange={this.onresBChange}
      placeholder="Enter second option (required)"
      />
      <label htmlFor="res_c">Third option:</label>
      <input
      type="text"
      name="res_c"
      id="res_c"
      onChange={this.onresCChange}
      placeholder="Enter third option"
      />
      <label htmlFor="res_d">Fourth option:</label>
      <input
      type="text"
      name="res_d"
      id="res_d"
      onChange={this.onresDChange}
      placeholder="Enter fourth option"
      />
      <p>{this.state.answer_error}</p>
      <label htmlFor="answer">Answer:</label>
      <input
      type="text"
      name="answer"
      id="answer"
      required={true}
      onChange={this.onAnswerChange}
      placeholder="Enter answer (required)"
      />
      <button type="submit" name="submit" value="submit">Add Question</button>
      </form>
    )
  }
}
