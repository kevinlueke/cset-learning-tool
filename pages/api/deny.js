import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { id } = await req.body
  const db = require('../../db')

  const query = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id],
  }

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'success',
      message: 'User successfully denied.'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'Something went wrong.'
    })
  }
})
