import { useState } from 'react'
import useUser from '../lib/useUser'
import fetchJson from '../lib/fetchJson'
import Router from 'next/router'

export default function LoginForm(){
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: false,
  })

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
      //Router.push('/test')
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }


  return(
    <form onSubmit={handleSubmit}>
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
