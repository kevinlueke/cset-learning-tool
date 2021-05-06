import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const {id} = await req.body
  const db = require('../../db')
  console.log('delete: ', id)

  const query = {
    text:"DELETE FROM questions WHERE id =$1",
    values:[id],
  }

  console.log(query)

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'removed',
      message: 'question deleted'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'question not deleted'
    })
  }
})
