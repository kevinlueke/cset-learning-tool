import {useState,Component} from 'react';

export default class AnswerFormMC extends Component {
  constructor(props) {
  super(props);

  this.state = {
    ques_id:props.id,
    buttonDisplay:'block',
    isChecked:false,
    result:false,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.answerCorrect = this.answerCorrect.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    this.hideButton()
    if(this.state.isChecked===true){
      console.log("save ques: ",this.props.ques_id,)
      // stuff to save the question here
    }
    if(this.state.selectedOption===this.props.answer){
      this.answerCorrect()
      console.log('TRUE')
    }else{
      console.log('FALSE')
    }
  }

  answerCorrect(){
    this.setState({ result: true },
    ()=>console.log('State updated', this.state.result))
  }

  hideButton(){
    this.setState({ buttonDisplay:'none',},
    ()=>console.log('State updated', this.state.buttonDisplay))
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
      <div>
      </div>
      <button style={{display:this.state.buttonDisplay}}type="submit" name="submit" value="submit">Answer</button>
      </form>
    )};
}
