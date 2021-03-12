import { useState } from 'react'
import fetchJson from '../lib/fetchJson'

export default function RegisterForm() {

  const bcrypt = require('bcryptjs')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const pass = e.currentTarget.password.value
    const fname = e.currentTarget.first_name.value
    const lname = e.currentTarget.last_name.value
    const email = e.currentTarget.email.value
    const body = {}

    await bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(pass, salt, function(err, hash) {
          setErrorMsg(String(body))
          body.fname = fname
          body.lname = lname
          body.email = email
          body.password = hash

          fetchJson('/api/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body),
          })
      })
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>First Name
        <input name="first_name" type="text" autoComplete="given-name" required />
      </label>
      <label>Last Name
        <input name="last_name" type="text" autoComplete="family-name" required />
      </label>
      <label>Email
        <input name="email" type="text" autoComplete="email" required />
      </label>
      <label>Password:
        <input name="password" type="password" autoComplete="new-password" required />
      </label>
      <button type="submit">Register</button>

      {errorMsg && <p>{errorMsg}</p>}
    </form>
  )
}
