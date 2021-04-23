import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { roles, classes } = await req.body
  const db = require('../../db')
  console.log(roles)

  const queries = []

  for (let i = 0; i < roles.length; i++) {
    queries.push({
      text: "UPDATE users SET role = $1, class = $2, confirmed = TRUE WHERE id = $3",
      values: [roles[i][1], classes[i][1], roles[i][0]]
    })
  }

  console.log(queries)
  try {
    for (let query of queries) {
      await db.query(query)
    }
    res.status(200).json({
      type: 'success',
      message: 'Successfully updated user status'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'Something went wrong.'
    })
  }
})
