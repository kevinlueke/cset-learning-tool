import withSession from '../../lib/session'

export default withSession(async (req, res) => {

  const { concept_id } = await req.body
  const db = require('../../db')


  const query = {
    text: "SELECT * FROM questions WHERE concept_id = $1 ORDER BY id DESC",
    values:[concept_id],
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
