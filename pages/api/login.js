import fetchJson from '../../lib/fetchJson'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { email, password } = await req.body
  const db = require('../../db')
  const bcrypt = require('bcryptjs')
  const query = {
    text: 'SELECT u.id, first_name, password, access_level FROM users u JOIN roles r ON u.role = r.id WHERE u.email = $1',
    values: [email],
  }
  try {
    const db_res = await db.query(query)
    const data = db_res.rows[0]
    if (data && bcrypt.compareSync(password, data.password)) {
      const user = { isLoggedIn: true, id: data.id, name: data.first_name, access: data.access_level}
      req.session.set('user', user)
      await req.session.save()
      res.status(200).json(user)
    } else {
      res.status(404).json({
        type: 'error',
        message: 'Invalid username or password'
      })
    }
  } catch (error) {
    console.error(error.stack)
    res.status(500).json(error)
  }

})
