import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const {id, question, clue, ans, res_a, res_b, res_c, res_d} = await req.body
  const db = require('../../db')
  console.log('edit question to:', id, question,ans)

  const query = {
    text:"UPDATE questions SET question=$1, clue=$2, ans=$3, res_a=$4, res_b=$5, res_c=$6, res_d=$7 WHERE id =$8",
    values:[question, clue, ans, res_a, res_b, res_c, res_d, id],
  }

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'saved',
      message: 'question edited'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'result not edited'
    })
  }
})
