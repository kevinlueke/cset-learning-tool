import { useState } from 'react'
import useCookie from '../lib/useCookie'
import fetchJson from '../lib/fetchJson'

export default function TestCookies() {
  const { mutateCookie } = useCookie({})

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      info: e.currentTarget.info.value,
    }

    try {
      await mutateCookie(
        fetchJson('/api/set-cookie', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      console.error('An unexpected error happened: ', error)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Info:
        <input name="info" type="text"/>
      </label>
      <button type="submit">Add to cookie</button>
    </form>
  )

}
