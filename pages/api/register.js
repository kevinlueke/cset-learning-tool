import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { fname, lname, email, password } = await req.body
  const db = require('../../db')

  const query = {
    text: "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
    values: [email, password, fname, lname]
  }

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'success',
      message: 'Account created successfully'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'Email in use.'
    })
  }
})
