import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState } from "react";
const db = require('../db')

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
//     <Link href={{pathname:course.endpoint}} key={course.num}><a><p>CSET {course.num}</p><p><span>{course.name}</span></p></a></Link>
// )

export default function Home({courseData}) {

  const [showMe, setShowMe] = useState(false);
  function toggle(){
    setShowMe(!showMe);
  }

  const [showMe2, setShowMe2] = useState(false);
  function toggle2(){
    setShowMe2(!showMe2);
  }
  //map the rows returned in the query of courses
  const conceptItems = courseData.map((c) =>
      <Link href="#" key={c.id}><a><p>{c.name_short}</p><p><span>{c.name_full}</span></p></a></Link>
  )

  function registerForm(){
    return(
      <form>
        <label htmlfor="first_name">First Name</label>
        <input id="first_name" type="text" autoComplete="name" required />
        <label htmlfor="last_name">Last Name</label>
        <input id="last_name" type="text" autoComplete="name" required />
        <label htmlfor="email">Email</label>
        <input id="email" type="text" autoComplete="email" required />
        <button type="submit">Register</button>
      </form>
    )
  }

  function loginForm(){
    return(
      <form>
        <label htmfor="email">Email</label>
        <input id="email" type="text" autoComplete="email" required />
        <button type="submit">Login</button>
      </form>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CLT</title>
      </Head>
      <nav>

      <button onClick={toggle} type="button" name="show_links">Register</button>
      <button onClick={toggle2} type="button" name="show_login">Log In</button>

      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to CLT!
        </h1>

        <p className={styles.description}>
          The CSET Learning Tool Capstone Project by Steve, Kate and Kevin.
        </p>
        <section className={styles.homeForm} style={{
          display: showMe?"block":"none"
        }}>
        <h2>Register Form</h2>
        {registerForm()}
        </section>
        <section className={styles.homeForm} style={{
          display: showMe2?"block":"none"
        }}>
        <h2>Login Form</h2>
        {loginForm()}
        </section>
        <section className={styles.courseContainer}>
        {conceptItems}
        </section>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
