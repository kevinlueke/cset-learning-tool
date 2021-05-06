import withSession from '../../lib/session'

export default withSession(async (req, res) => {

  

  const query = {
    text: "SELECT * FROM concepts WHERE course_id = $1",
    values:[cid]
  }

  try {
    const db_res = await db.query(query)
    const results_data = db_res.rows
    res.status(200).json(db_res.rows)

  } catch (error) {
    console.log(error)
    res.status(500).json(error.stack)
  }
}
