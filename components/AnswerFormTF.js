import {useState,Component} from 'react';

export default class AnswerFormTF extends Component {
  constructor(props) {
  super(props);

  this.state = {
      ques_id:props.id,
      answer:'',
      res_a:'',
      res_b:'',
      buttonDisplay:'block',
      checkDisplay:'hidden',
      xDisplay:'hidden'
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    onValueChange(event) {
      this.setState({
        selectedOption: event.target.value
      });
    }

    formSubmit(event) {
      event.preventDefault();
      if(this.state.isChecked===true){
        console.log("save ques: ",this.props.ques_id,)
        // stuff to save the question here
      }
      if(this.state.selectedOption===this.props.answer){
        console.log('TRUE')
        this.setState({
          buttonDisplay:'none',
          checkDisplay:'visible'
        })
      }else{
        console.log('FALSE')
        this.setState({
          buttonDisplay:'none',
          xDisplay:'visible'
        })
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
      <span style={{visibility:this.state.checkDisplay}}>&#10003;</span>
      <span style={{visibility:this.state.xDisplay}}>X</span>
      </div>
      <button style={{display:this.state.buttonDisplay}} type="submit" name="submit" value="submit">Answer</button>
      </form>
    )};
  }
