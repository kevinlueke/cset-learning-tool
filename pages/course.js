import Head from 'next/head'
import Link from 'next/link'
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
// const listItems = courses.map((course) =>
//   course.num === 105 ?
//     <Link href={{pathname:course.endpoint2}} key={course.num}><a>CSET {course.num}</a></Link>
//   :
//     <Link className={styles.special} href={{pathname:course.endpoint2}} key={course.num}><a>CSET {course.num}</a></Link>
// )

// const conceptItems = concepts.map((concept) =>
//     <a href={concept.pg_id} key={concept.num}>{concept.name}</a>
// )
//
// const sectionData = conceptD.map((conData)=>
//     <div><h2 id={conData.id} key={conData.id}>{conData.title}</h2>
//     <p>{conData.data}</p><button type="button" name="">Take Concept Quiz</button></div>
// )

export default function course({courseData}){

  const conceptItems = courseData.map((c) =>
      <Link href="#" key={c.id}><a>{c.name_short}</a></Link>
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
