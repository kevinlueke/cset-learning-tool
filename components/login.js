import { useState } from 'react'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'
import styles from '../styles/Home.module.css'

export default function LoginForm({ onToggle }){
  const { mutateUser } = useUser({
    redirectTo: '/test',
    redirectIfFound: true,
  })

  const handleToggle = (e) => {
    onToggle(false)
  }

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    try {
      await mutateUser(
        fetchJson('/api/login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }


  return(
    <form onSubmit={handleSubmit}>
      <button type='button' onClick={handleToggle} className={styles.close}>X</button>
      <label>Email:
        <input name="email" type="text" autoComplete="email" required />
      </label>
      <label>Password:
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button type="submit">Login</button>

      {errorMsg && <p>{errorMsg}</p>}
    </form>
  )
}
