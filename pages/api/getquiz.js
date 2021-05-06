import withSession from '../../lib/session'

export default withSession(async (req, res) => {

  const { cid , no_ques } = await req.body
  const db = require('../../db')

  console.log(cid, no_ques, "!!!!!!!!!!!!!!!!!!")

  const query = {
    text: "SELECT q.question,q.clue,q.ans,q.res_a,q.res_b,q.res_c,q.res_d,q.id,con.title FROM questions q JOIN concepts con ON q.concept_id = con.id WHERE q.concept_id = $1 ORDER BY random() LIMIT $2",
    values:[cid,no_ques],
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
