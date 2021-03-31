import {useState,Component} from 'react';
import useCookie from '../lib/useCookie'
import fetchJson from '../lib/fetchJson'

export default class AnswerFormMC extends Component {
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
  }

  storeResults(x, y){
    const student_id = this.props.user
    const question_id = this.props.id
    const result = y
    let save = x
    const body = {}

    body.student_id=student_id
    body.question_id = question_id
    body.question_result = result
    body.save = save

    fetch('api/savequestion', {
      method:'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  formSubmit(event) {
    event.preventDefault();
    this.hideButton()
    if(this.state.selectedOption===this.props.ans){
      if(this.state.isChecked===true){
        this.storeResults(true, true)
      } else {
        this.storeResults(false, true)
      }
    }else{
      if(this.state.isChecked===true){
        this.storeResults(true,false)
      } else {
        this.storeResults(false,false)
      }
    }
  }

  hideButton(){
    this.setState({ buttonDisplay:'none',},
    ()=>console.log('buttonDisplay:', this.state.buttonDisplay))
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

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  render(){
    return (
      <form onSubmit={this.formSubmit}>
      <ul>
      <li><h3>{this.props.question}</h3></li>
      <li>
        <input
        type="radio"
        name="multipleChoice"
        checked={this.state.selectedOption === this.props.res_a}
        value={this.props.res_a}
        onChange={this.onValueChange}
        />{this.props.res_a}
      </li>
      <li>
        <input
        type="radio"
        name="multipleChoice"
        value={this.props.res_b}
        checked={this.state.selectedOption === this.props.res_b}
        onChange={this.onValueChange}
        />{this.props.res_b}
      </li>
      <li>
        <input
        type="radio"
        name="multipleChoice"
        value={this.props.res_c}
        checked={this.state.selectedOption === this.props.res_c}
        onChange={this.onValueChange}
        />{this.props.res_c}
      </li>
      <li>
        <input
        type="radio"
        name="multipleChoice"
        value={this.props.res_d}
        checked={this.state.selectedOption === this.props.res_d}
        onChange={this.onValueChange}
        />{this.props.res_d}
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
      <button style={{display:this.state.buttonDisplay}}type="submit" name="submit" value="submit">Answer</button>
      </form>
    )};
}
