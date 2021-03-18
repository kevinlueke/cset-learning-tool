import {useState,Component} from 'react';
// const db = require('../db')

export default class AnswerFormTF extends Component {
  constructor(props) {
  super(props);

  this.state = {
      ques_id:props.id,
      buttonDisplay:'block',
      isChecked:false,
      result:null,
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.answerCorrect = this.answerCorrect.bind(this);
    this.answerInorrect = this.answerInorrect.bind(this);
    }

    onValueChange(event) {
      this.setState({
        selectedOption: event.target.value
      });
    }

    answerCorrect(){
      this.setState({ result: true },
      ()=>console.log('TF state updated to:', this.state.result))
    }

    answerInorrect(){
      this.setState({ result: false },
      ()=>console.log('TF state updated to:', this.state.result))
    }

    hideButton(){
      this.setState({ buttonDisplay:'none',},
      ()=>console.log('buttonDisplay state updated to:', this.state.buttonDisplay))
    }

    formSubmit(event) {
      event.preventDefault();
      this.hideButton()
      if(this.state.isChecked===true){
        console.log("save ques: ",this.props.ques_id)
        //DATABASE LOGIC HERE
        // const ques_query = {
        //   text:'INSERT INTO student_questions(student_id, question_id) VALUES ($1, $2)',
        //   values:[user_id,this.props.ques_id],
        // }
        // try {
        //   const res = await db.query(ques_query)
        // } catch (err) {
        //   console.log(err.stack)
        // }
      }
      if(this.state.selectedOption===this.props.answer){
        this.answerCorrect()
        console.log(this.props.ques_id,'TRUE')
        //COOKIE LOGIC
      }else{
        this.answerInorrect()
        console.log(this.props.ques_id,'FALSE')
        this.answerInorrect()
        //COOKIE LOGIC
      }

    }

    handleChange(event) {
          this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked
            }
          ), function () {
              console.log(this.state.isChecked, 'updated state value');
          });
          console.log(event.target.checked);
        }

  render(){
    return (
      <form onSubmit={this.formSubmit}>
      <ul>
      <li>
        <input
        type="radio"
        name="trueFalse"
        value={this.props.res_a}
        checked={this.state.selectedOption === this.props.res_a}
        onChange={this.onValueChange}
        />{this.props.res_a}
      </li>
      <li>
        <input
        type="radio"
        name="trueFalse"
        value={this.props.res_b}
        checked={this.state.selectedOption === this.props.res_b}
        onChange={this.onValueChange}
        />{this.props.res_b}
      </li>
      <li>
        <input
        type="checkbox"
        name="save"
        value="true"
        onChange={this.handleChange}
        />
        <label htmlFor="save">save question</label>
        </li>
      </ul>
      <div>
      </div>
      <button style={{ display: this.state.buttonDisplay}} type="submit" name="submit" value="submit">Answer</button>
      </form>
    )};
  }
