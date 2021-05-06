import {useState,Component} from 'react';
import fetchJson from '../lib/fetchJson'
import CreateQuestion from './CreateQuestion'
import EditQuestion from './EditQuestions'
import styles from '../styles/NewQuestionForm.module.css'

export default class QuestionDropdown extends Component{

  constructor(props) {
  super(props);

  this.state = {
    course_data : this.props.courseData,
    course_selection:null,
    concept_selection:null,
    question_data:[],
    concept_data:[],
    update_questions:this.updateData,

  };
  this.setConceptData = this.setConceptData.bind(this);
  this.setQuestionData = this.setQuestionData.bind(this);
  this.selectCourse = this.selectCourse.bind(this);
  this.setConcept = this.setConcept.bind(this);
  this.updateData = this.updateData.bind(this);
  }

  updateData(){
    console.log('now this - update the data')
    const concept_id = Number(this.state.concept_selection)
    const body = {}
    body.concept_id = concept_id

    try {
      fetch('/api/getallquestions', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then(result => result.json())
        .then(data => {
          console.log("CEQ set question data on update")
          this.setQuestionData(data)
        })
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  setConceptData(data){
    this.setState ({concept_data: data,},
    ()=>console.log("set concept data"))
  }

  async setQuestionData(data){
    await this.setState ({question_data: data,},
    ()=>console.log("set question data"))
  }

  async selectCourse(event){
    event.preventDefault()
    await this.setState({ course_selection:event.target.value,},
    ()=>console.log('change:', this.state.course_selection))

    const course_id = Number(this.state.course_selection)
    const body = {}
    body.course_id = course_id

    try {
      await fetch('/api/get_concepts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then(result => result.json())
        .then(data => {
          console.log(data)
          this.setConceptData(data)
        })
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  async setConcept(event){
    await this.setState({ concept_selection:event.target.value,},
    ()=>console.log('change:', this.state.concept_selection))

    const concept_id = Number(this.state.concept_selection)
    const body = {}
    body.concept_id = concept_id

    try {
      await fetch('/api/getallquestions', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then(result => result.json())
        .then(data => {
          console.log("CEQ set question data.....")
          this.setQuestionData(data)
        })
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  render(){

    const courseItems = this.props.course_data.map((c) =>
      <option
      value={c.id}
      key={c.id}
      >{c.name_short}
      </option>
    )

    const conceptItems = this.state.concept_data.map((c) =>
      <option
      value={c.id}
      key={c.id}
      >{c.title}
      </option>
    )

    const allQuestions = this.state.question_data.map((c) =>
      <EditQuestion key={c.id} id={c.id} question={c.question} clue={c.clue}
      ans={c.ans} res_a={c.res_a} res_b={c.res_b} res_c={c.res_c} res_d={c.res_d}
      onUpdate={this.updateData}
      />
    )

    return(
      <div className={styles.container}>
      <h3>Create New/Edit Quiz Questions</h3>
      <h5>Select Course & Concept</h5>
      <form className={styles.box}>
      <select name="course" id="course" onChange={this.selectCourse}>
      <option
      value="none"
      >Select Course</option>
      {courseItems}
      </select>

      <select name="concept" id="concept" onChange={this.setConcept}>
      <option
      value="none"
      >Select Concept</option>
      {conceptItems}
      </select>

      </form>
      <h5>Create New Question</h5>
      <CreateQuestion cid={this.state.concept_selection} onUpdate={this.updateData}/>

      <section className={styles.questions}>
      <h5>Edit Existing Questions</h5>
      {allQuestions}
      </section>

      </div>
    )
  }

}
