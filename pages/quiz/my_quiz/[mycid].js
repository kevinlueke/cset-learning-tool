import styles from '../../styles/Quiz.module.css'
import {Component} from 'react';
import { useState } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'
import QuizCarousel from '../../components/QuizCarousel'
import useUser from '../../lib/useUser'
import useCookie from '../../lib/useCookie'
const db = require('../../db')

export async function getStaticPaths() {
  const query = {
    text: 'SELECT id FROM concepts'
  }
  try {
    const res = await db.query(query)

    const paths = res.rows.map((concept) => ({
      params: { cid: concept.id }
    }))

    return { paths, fallback: false }
  } catch (err) {
    console.log(err.stack)
  }

  }

export async function getStaticProps ({ params }) {

  const cid = params.cid

  const query = {
    text: "SELECT * FROM concepts WHERE id = $1",
    values:[cid],
  }

  try {
    const res = await db.query(query)
    const title = res.rows[0].title
    const id = res.rows[0].id
    return {
      props: {
        title, id
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default function Quiz({title, id}) {

  const { user } = useUser( { redirectTo: '/' } )
  const { cookie } = useCookie({})

  if (!user || user.isLoggedIn === false || !cookie) {
    return <p>Loading...</p>
  }

  return(
      <article>
        <h1 className={styles.quiztitle}>{title}</h1>
        <QuizCarousel cid={id} title={title} username={user.name} userid={user.id}/>
      </article>
    )
};
