import withSession from '../../lib/session'

export default withSession(async (req, res) => {

  const {student_id, question_ids} = await req.body
  const db = require('../../db')

  let params=[]
  let query_values =[student_id]

  for (let i=1; i<=question_ids.length; i++){
    params.push('$' + (i+1))
    query_values.push(question_ids[i-1].toString())
  }

  const query = {
    text: "SELECT s.question_result, s.save, s.question_id, q.question FROM student_questions s LEFT JOIN questions q ON q.id = s.question_id WHERE student_id =$1 AND question_id IN (" + params.join(",")+")",
    values:query_values,
  }

  try {
    const db_res = await db.query(query)
    const results_data = db_res.rows

    res.status(200).json(db_res.rows)

  } catch (error) {
    console.log(error)
    res.status(500).json(error.stack)
  }
})
