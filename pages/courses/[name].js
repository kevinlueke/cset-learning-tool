import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
const db = require('../../db')
import styles from '../../styles/Courses.module.css'

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
    text: 'SELECT * FROM courses WHERE name_short = $1',
    values: [name],
  }

  const query_courses = {
    text: 'SELECT * FROM courses'
  }

  try {
    const res_names = await db.query(query_names)
    const courseData = res_names.rows[0]

    const query_concepts = {
      text: 'SELECT * FROM concepts WHERE course_id = $1',
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
  const courseItems = courseList.map((c) =>
    <Link href={`/courses/${c.name_short.replaceAll(' ', '_')}`} key={c.id}><a>{c.name_short}</a></Link>
  )

  const conceptItems = conceptList.map((c) =>
    <a href={'#' + c.id} key={c.id}>{c.title}</a>
  )

  const conceptBodies = conceptList.map((c) =>
    <article id={c.id}>
      <h2>{c.title}</h2>
      <p>{c.body}</p>
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

      <section className={styles.courseContent}>
        {conceptBodies}
      </section>

    </main>

  )
}
