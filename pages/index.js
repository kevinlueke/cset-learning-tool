import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
const db = require('../db')
import React, { useState } from "react";
import RegisterForm from '../components/register'
import LoginForm from '../components/login'

export async function getStaticProps () {
  const query = {
    text: 'SELECT * FROM courses',
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

export default function Home({courseData}) {

  const [showLogin, setShowLogin] = useState(false);
  function toggle(){
    setShowLogin(!showLogin);
  }

  const [showRegister, setShowRegister] = useState(false);
  function toggle2(){
    setShowRegister(!showRegister);
  }
  //map the rows returned in the query of courses
  const conceptItems = courseData.map((c) =>
      <Link href="#" key={c.id}><a><p>{c.name_short}</p><p><span>{c.name_full}</span></p></a></Link>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>CLT</title>
      </Head>
      <nav>

      <button onClick={toggle2} type="button" name="show_links">Register</button>
      <button onClick={toggle} type="button" name="show_login">Log In</button>

      </nav>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to CLT!
        </h1>

        <p className={styles.description}>
          The CSET Learning Tool Capstone Project by Steve, Kate and Kevin.
        </p>
        <section className={styles.homeForm} style={{
          display: showRegister?"block":"none"
        }}>
        <RegisterForm/>
        </section>
        <section className={styles.homeForm}style={{
          display: showLogin?"block":"none"
        }}>
        <LoginForm/>
        </section>
        <section className={styles.courseContainer}>
        {conceptItems}
        </section>
      </main>
    </div>
  )
}
