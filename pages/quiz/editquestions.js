import QuestionDropdown from '../../components/CreateEditQuestions'
import React, { useState } from "react";
import useUser from '../../lib/useUser'
const db = require('../../db')

export async function getStaticProps(){
  const query = {
    text: 'SELECT id, name_short FROM courses',
  }
  const query2 = {
    text: 'SELECT id, title FROM concepts',
  }
  try {
    const res = await db.query(query)
    const courseData = res.rows
    return {
      props: {
        courseData
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default function Test({courseData}) {
  const { user } = useUser({ redirectTo: '/', allowed: [1, 2] })

  return (

    <div>

    <QuestionDropdown course_data={courseData}/>

    </div>
  )
}
