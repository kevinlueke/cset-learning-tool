import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/course.module.css'

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

export default function cset_105(){
  return(
    <main>
    <Head>
    <title>CSET 105</title>
    </Head>
    <h1 className={styles.pageTitle}>CSET 105: Intro to Web Applications</h1>

    <aside className={ styles.courseAside }>

    </aside>
    <div className={styles.conceptDiv}>

    </div>

    <section className={styles.courseContent}>

    </section>

    </main>

  )
}
