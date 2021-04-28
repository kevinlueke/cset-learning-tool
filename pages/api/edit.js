import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { body, id } = await req.body
  const db = require('../../db')

  const query = {
    text: 'UPDATE concepts SET body = $1 WHERE id = $2',
    values: [body, id],
  }

  try {
    const db_res = await db.query(query)
    res.status(200).end()
  } catch (error) {
    console.error(error.stack)
    res.status(500).json(error)
  }
})
