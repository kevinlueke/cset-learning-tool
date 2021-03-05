import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// const listItems = courses.map((course) =>
//     <Link href={{pathname:course.endpoint}} key={course.num}><a><p>CSET {course.num}</p><p><span>{course.name}</span></p></a></Link>
// )

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Learning Tool</title>
      </Head>
      <nav>

      <button type="button" name="show_links">Links</button>
      <button type="button" name="show_login">Log In</button>
      <button type="button" name="show_register">Register</button>

      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to THE CSET Learning Tool!
        </h1>

        <p className={styles.description}>
          Capstone Project by Steve, Kate and Kevin. Supplimentary learning tool for CSET.
        </p>

        <section className={styles.courseContainer}>

        </section>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
