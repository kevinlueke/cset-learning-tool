import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Courses.module.css'

export default function CoursePage(){
  const router = useRouter()
  const { cid } = router.query


//   const body = {}
//
//   body.course_id = course_id
//
//   try {
//     await fetch('/api/getconcepts', {
//       method: 'POST',
//       headers: { 'Content-type': 'application/json' },
//       body: JSON.stringify(body),
//     }).then(result => result.json())
//       .then(data => {
//         this.setConcepts(data)
//       })
//   } catch (error) {
//     console.error('An unexpected error happened:', error)
//   }
// }




  return <p>course {cid}</p>
}
