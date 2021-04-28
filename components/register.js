import { useState } from 'react'
import fetchJson from '../lib/fetchJson'
import styles from '../styles/Home.module.css'

export default function RegisterForm({ onToggle }) {

  const handleToggle = (e) => {
    onToggle(false)
  }

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
        body.fname = fname
        body.lname = lname
        body.email = email
        body.password = hash

        fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => setErrorMsg(data.message))
        .catch((error) => {
          setErrorMsg(error.message)
        })


      })
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <button type='button' onClick={handleToggle} className={styles.close}>X</button>
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
