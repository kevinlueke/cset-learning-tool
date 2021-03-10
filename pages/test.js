const db = require('../db')

export async function getStaticProps () {
  const query = {
    text: 'SELECT * FROM users WHERE first_name ILIKE $1',
    values: ['si%']
  }
  try {
    const res = await db.query(query)
    const userData = res.rows[0]
    const otherUser = res.rows[1]
    return {
      props: {
        userData,
        otherUser
      }
    }
  } catch (err) {
    console.log(err.stack)
  }

}

export default function Test({ userData, otherUser }) {
  return (
    <p>{userData.email} + {otherUser.email}</p>
  )
}
