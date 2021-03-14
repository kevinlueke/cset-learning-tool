import styles from '../styles/Quiz.module.css'
import Slide from '../components/carousel'
const db = require('../db')

export async function getStaticProps () {
  const query = {
    text: 'SELECT * FROM questions WHERE concept_id = $1',
    values:[1],
  }
  try {
    const res = await db.query(query)
    const quiz_questions = res.rows
    return {
      props: {
        quiz_questions
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default function Quiz({quiz_questions}){

  const carousel = Slide(quiz_questions)

  return(

    <article className={styles.main}>
    <h1>Quiz</h1>
    {carousel}
    </article>

  );
}
