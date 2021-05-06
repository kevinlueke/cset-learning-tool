import styles from '../styles/NewQuestionForm.module.css'
import {useState,Component} from 'react';

export default class EditQuestion extends Component {

  constructor(props) {
  super(props);

  this.state = {
    id:props.id,
    question:props.question,
    clue:props.clue,
    res_a:props.res_a,
    res_b:props.res_b,
    res_c:props.res_c,
    res_d:props.res_d,
    ans:props.ans,
    submit_edit_display:'none',
    answer_error:null,
    border:'none',
    update: this.props.update
    };

    this.enableEdit = this.enableEdit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.onQuesChange = this.onQuesChange.bind(this);
    this.onClueChange = this.onClueChange.bind(this);
    this.onresAChange = this.onresAChange.bind(this);
    this.onresBChange = this.onresBChange.bind(this);
    this.onresCChange = this.onresCChange.bind(this);
    this.onresDChange = this.onresDChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  handleUpdate(){
    this.props.onUpdate()
  }

  enableEdit(event){
    event.preventDefault()
    if (this.state.submit_edit_display == 'none'){
      this.setState({ submit_edit_display:'block', border:'1px solid grey'},
      ()=>console.log('allow edit'))
  } else {
    this.setState({ submit_edit_display:'none', border:'none'},
    ()=>console.log('disable edit'))
  }
  }

  onQuesChange(event) {
    this.setState({
      question: event.target.value})
  }

  onClueChange(event) {
    this.setState({
      clue: event.target.value})
  }

  onresAChange(event) {
    this.setState({
      res_a: event.target.value})
  }

  onresBChange(event) {
    this.setState({
      res_b: event.target.value})
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
      answer: event.target.value})
  }

  checkAnswer(){
    if (this.state.ans == this.state.res_a || this.state.ans == this.state.res_b || this.state.ans == this.state.res_c || this.state.ans == this.state.res_d){
      return true
    } else {
      console.log(this.state.ans,this.state.res_a,this.state.res_b,this.state.res_c,this.state.res_d)
      return false
    }
  }

  async deleteQuestion(event){
    event.preventDefault()
    const id = Number(this.state.id)
    const body = {}
    body.id = id
    console.log('delete question:', body)
    const response = await fetch('/api/deletequestion', {
      method:'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    console.log(response)
    this.handleUpdate()
  }

  submitEdit(event){
    event.preventDefault()
    let pass = this.checkAnswer()
    console.log("did it pass?", pass)
    if (pass == true){
      this.setState({ submit_edit_display:'hidden'})
      this.setState({
        answer_error: ''},
      ()=>console.log('answer == option'))
      this.setState({
        answer_error: null},
      ()=>console.log('no error'))
      const id = this.state.id
      const question = this.state.question
      const ans = this.state.ans
      const clue = this.state.clue
      const res_a = this.state.res_a
      const res_b = this.state.res_b
      const res_c = this.state.res_c
      const res_d = this.state.res_d
      const body = {}

      body.id = id
      body.question = question
      body.clue = clue
      body.ans = ans
      body.res_a = res_a
      body.res_b = res_b
      body.res_c = res_c
      body.res_d = res_d
      console.log('edit question to:', body)
      fetch('/api/editquestion', {
        method:'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      }).then(response => response.json())
      .then(data => console.log(data))

    }else{
      this.setState({
        answer_error: 'answer does not match an option'},
      ()=>console.log('error'))
    }
  }


  render(){

    return(

      <div>
      <form onSubmit={this.submitEdit}>
        <input
        type="hidden"
        defaultValue={this.props.id} />
        <label htmlFor="question">Question:</label>
        <input
        name="question"
        id="question"
        type="text"
        onChange={this.onQuesChange}
        defaultValue={this.props.question}
        style={{border:this.state.border}}
        />
        <div id={styles.content_holder} style={{display:this.state.submit_edit_display}}>
        <p>{this.state.answer_error}</p>
        <label htmlFor="answer">Answer:</label>
        <input
        id="answer"
        name="answer"
        type="text"
        onChange={this.onAnswerChange}
        defaultValue={this.props.ans}
        style={{border:this.state.border}}
        />
        <label htmlFor="clue">Clue:</label>
        <input
        id="clue"
        name="clue"
        type="text"
        onChange={this.onClueChange}
        defaultValue={this.props.clue}
        style={{border:this.state.border}}
        />
        <table>
        <tbody>
        <tr>
        <td>
        <label className={styles.option_label} htmlFor="res_a">Option A:</label>
        <input
        id="res_a"
        name="res_a"
        type="text"
        onChange={this.onresAChange}
        defaultValue={this.props.res_a}
        style={{border:this.state.border}}
        />
        </td>
        <td>
        <label className={styles.option_label} htmlFor="res_b">Option B:</label>
        <input
        id="res_b"
        name="res_b"
        type="text"
        onChange={this.onresBChange}
        defaultValue={this.props.res_b}
        style={{border:this.state.border}}
        />
        </td>
        </tr>
        <tr>
        <td>
        <label className={styles.option_label} htmlFor="res_c">Option C:</label>
        <input
        id="res_c"
        name="res_c"
        type="text"
        onChange={this.onresCChange}
        defaultValue={this.props.res_c}
        style={{border:this.state.border}}
        />
        </td>
        <td>
        <label className={styles.option_label} htmlFor="res_d">Option D:</label>
        <input
        id="res_d"
        name="res_d"
        type="text"
        onChange={this.onresDChange}
        defaultValue={this.props.res_d}
        style={{border:this.state.border}}
        />
        </td>
        </tr>
        </tbody>
        </table>
        <button name="submit" type="submit">Submit Edit</button>
        <button name="submit" type="submit" id={styles.delete_button} onClick={this.deleteQuestion}>Delete this Question</button>
        </div>
        </form>
        <button name="edit" type="submit" onClick={this.enableEdit}>Edit</button>
        </div>

    )
  }
}
