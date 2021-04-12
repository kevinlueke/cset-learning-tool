import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
const db = require('../../db')
import styles from '../../styles/Courses.module.css'
import { useState } from 'react'
import useUser from '../../lib/useUser'

export async function getStaticPaths () {
  const query = {
    text: 'SELECT name_short FROM courses'
  }
  try {
    const res = await db.query(query)

    const paths = res.rows.map((course) => ({
      params: { name: course.name_short.replaceAll(' ', '_') }
    }))

    return { paths, fallback: false }
  } catch (err) {
    console.log(err.stack)
  }
}

export async function getStaticProps ({ params }) {
  const name = params.name.replaceAll('_', ' ')

  const query_names = {
    text: 'SELECT * FROM courses WHERE name_short = $1 ORDER BY id',
    values: [name],
  }

  const query_courses = {
    text: 'SELECT * FROM courses'
  }

  try {
    const res_names = await db.query(query_names)
    const courseData = res_names.rows[0]

    const query_concepts = {
      text: 'SELECT * FROM concepts WHERE course_id = $1 ORDER BY id',
      values: [courseData.id],
    }

    const res_concepts = await db.query(query_concepts)
    const conceptList = res_concepts.rows
    const res_courses = await db.query(query_courses)
    const courseList = res_courses.rows
    return {
      props: {
        courseData, courseList, conceptList
      }
    }
  } catch (err) {
    console.error(err.stack)
  }
}

export default function Course ({ courseData, courseList, conceptList }) {
  const [editMode, setEditMode] = useState(0)

  const { user } = useUser( { redirectTo: '/' } )

  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  function handleEdit (e) {
    setEditMode(e.currentTarget.value)
  }


  function handleSubmit (e) {
    e.preventDefault()

    const body = {
      body: e.currentTarget.body.value,
      id: e.currentTarget.id.value,
    }

    fetch('/api/edit', {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(body),
    }).then(response => Router.reload())
  }

  const courseItems = courseList.map((c) =>
    <Link href={`/courses/${c.name_short.replaceAll(' ', '_')}`} key={c.id}><a>{c.name_short}</a></Link>
  )

  const conceptItems = conceptList.map((c) =>
    <a href={'#' + c.id} key={c.id}>{c.title}</a>
  )

  const conceptBodies = (editMode) => conceptList.map((c) =>
    <article id={c.id}>
      <h2>{c.title}</h2>
      {editMode && editMode == c.id ?
        <form onSubmit={handleSubmit}>
          <textarea name='body' className={styles.editArea} rows='20' defaultValue={c.body} />
          <input type='hidden' name='id' value={c.id} />
          <button type='submit'>Submit</button>
          <button value='0' onClick={handleEdit}>Stop Editing</button>
        </form>
        :
        <section>
          <p>{c.body}</p>
          {[1, 2].includes(user.access) &&
            <button value={c.id} onClick={handleEdit}>Edit</button>
          }
        </section>
      }

    </article>
  )



  return(
    <main>
      <Head>
        <title>{courseData.name_short}</title>
      </Head>
      <h1 className={styles.pageTitle}>{courseData.name_short}: {courseData.name_full}</h1>

      <aside className={styles.courseAside}>
        {courseItems}
      </aside>
      <div className={styles.conceptDiv}>
        {conceptItems}
      </div>

      <div className={styles.courseContent}>
        {editMode ? conceptBodies(editMode) : conceptBodies(editMode)}
      </div>

    </main>

  )
}
