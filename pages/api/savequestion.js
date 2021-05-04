import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const {student_id, question_id, question_result, save} = await req.body
  const db = require('../../db')

  const query = {
    text:"INSERT INTO student_questions (student_id, question_id, question_result, save) VALUES ($1, $2,$3,$4) ON CONFLICT (student_id,question_id) DO UPDATE SET question_result=$3, save = $4",
    values:[student_id,question_id, question_result, save],
  }

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'saved',
      message: 'question response saved'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'result not saved'
    })
  }
})
