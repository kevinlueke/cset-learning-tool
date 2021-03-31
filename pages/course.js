import Head from 'next/head'
import CourseList from '../components/course-list.js'
const db = require('../db')
import styles from '../styles/Courses.module.css'

export async function getStaticProps () {
  const query = {
    text: 'SELECT * FROM courses',
  }
  try {
    const res = await db.query(query)
    console.log("!!!!!!!" + res.rowCount)
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

export default function course({courseData}){

  const conceptItems = courseData.map((c) =>
      <Link href={`/courses/${c.name_short.replaceAll(' ', '_')}`} key={c.id}><a>{c.name_short}</a></Link>
  )

  return(
    <main>
    <Head>
    <title>CSET 105</title>
    </Head>
    <h1 className={styles.pageTitle}>CSET 105: Intro to Web Applications</h1>

    <aside className={ styles.courseAside }>
    {conceptItems}
    </aside>
    <div className={styles.conceptDiv}>

    </div>

    <section className={styles.courseContent}>

    </section>

    </main>

  )
}
