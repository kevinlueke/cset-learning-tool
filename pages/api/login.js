import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { email, password } = await req.body
  const db = require('../../db')
  const bcrypt = require('bcryptjs')
  try {
    const query = {
      text: 'SELECT id, first_name, password FROM users WHERE email = $1',
      values: [email],
    }
    const db_res = await db.query(query)
    const data = db_res.rows[0]
    bcrypt.compare(password, data.password, function(err, res) {
      if (res) {
        const user = { isLoggedIn: true, id: data.id, name: data.first_name, }
        req.session.set('user', user)
        await req.session.save()
        res.json(user)
      }
    })
  } catch (error) {
    res.status(500).json(error.stack)
  }
})
