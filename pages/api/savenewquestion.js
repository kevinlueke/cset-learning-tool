import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const {cid, question, clue, ans, res_a, res_b, res_c, res_d} = await req.body
  const db = require('../../db')
  console.log("SAVE THIS", cid, question, clue, ans, res_a, res_b, res_c, res_d)


  const query = {
    text:"INSERT INTO questions (concept_id, question, clue, ans, res_a,res_b,res_c,res_d) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    values:[cid, question, clue, ans, res_a, res_b, res_c, res_d],
  }

  try {
    const db_res = await db.query(query)
    res.status(200).json({
      type: 'saved',
      message: 'question saved'
    })
  } catch (error) {
    res.status(400).json({
      type: 'error',
      message: 'result not saved'
    })
  }
})
