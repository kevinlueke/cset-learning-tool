import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Admin.module.css'
import homeStyles from '../styles/Home.module.css'
const db = require('../db')
import React, { useState } from "react";
import Router, { useRouter } from 'next/router'
import useUser from '../lib/useUser'

export async function getStaticProps () {
  const userQuery = {
    text: 'SELECT id, email, first_name, last_name FROM users WHERE confirmed = FALSE',
  }
  const classQuery = {
    text: 'SELECT * FROM classes ORDER BY class_name'
  }
  const roleQuery = {
    text: 'SELECT id, role_name FROM roles ORDER BY id'
  }

  try {
    const userRes = await db.query(userQuery)
    const userData = userRes.rows

    const classRes = await db.query(classQuery)
    const classData = classRes.rows

    const roleRes = await db.query(roleQuery)
    const roleData = roleRes.rows

    return {
      props: {
        userData,
        classData,
        roleData,
      }
    }
  } catch (err) {
    console.log(err.stack)
  }
}

export default function Admin ({ userData, classData, roleData }) {
  const { user } = useUser({ redirectTo: '/', allowed: [1] })
  const classIdData = {}
  const roleIdData = {}
  const checkedData = {}
  for (let c of userData) {
    classIdData[c.id] = classData[0].id
    roleIdData[c.id] = roleData[0].id
    checkedData[c.id] = false
  }
  const [classId, setClassId] = useState(classIdData)
  const [roleId, setRoleId] = useState(roleIdData)
  const [checked, setChecked] = useState(checkedData)

  if (!user || user?.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  const handleRoleChange = (e) => {
    setRoleId({...roleId, [e.target.id]: e.target.value})
  }

  const handleClassChange = (e) => {
    setClassId({...classId, [e.target.id]: e.target.value})
  }

  const handleCheckClick = (e) => {
    setChecked({...checked, [e.target.id]: !checked[e.target.id]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const roles = [...e.target.role].map(el => checked[el.id] ? [el.id, el.value] : null)
    const classes = [...e.target.class].map(el => [el.id, el.value === "NULL" ? null : el.value])
    const body = {
      roles: roles.filter(el => el !== null),
      classes: classes,
    }

    const res = await fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    Router.reload()
  }

  const handleDeny = async (e) => {
    const body = {
      id: event.target.value
    }

    const res = await fetch('/api/deny', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    })

    Router.reload()
  }

  const handleHomeClick = (e) => {
    Router.push('/')
  }

  const roleList = roleData.map((c) =>
    <option key={c.id} value={c.id}>{c.role_name}</option>
  )

  const classList = classData.map((c) =>
    <option key={c.id} value={c.id}>{c.class_name}</option>
  )

  const userTable = userData.map((c) =>
    <tr key={c.id}>
      <td>{c.first_name.charAt(0).toUpperCase() + c.first_name.slice(1)} {c.last_name.charAt(0).toUpperCase() + c.last_name.slice(1)}</td>
      <td>
        <select id={c.id} name="role" value={roleId[c.id]} onChange={handleRoleChange}>
          {roleList}
        </select>
      </td>
      {roleId[c.id] == 3
        ? <td>
          <select id={c.id} name="class" value={classId[c.id]} onChange={handleClassChange}>
            {classList}
          </select>
        </td>
        : <td className={styles.hidden}><input id={c.id} type="hidden" name="class" value="NULL" /></td>
      }
      <td>
        <input id={c.id} defaultChecked={checked[c.id]} name="checkbox" type='checkbox' value={c.id} onClick={handleCheckClick}/>
      </td>
      <td>
        <button type="button" name="deny" value={c.id} onClick={handleDeny}>Deny</button>
      </td>
    </tr>
  )

  return (
    <main>
      <Head>
        <title>Admin Control</title>
      </Head>
      <nav className={styles.nav}>
        <button className={homeStyles.homeButton} onClick={handleHomeClick} type='button'>Home</button>
      </nav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <table className={styles.scrollable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Class</th>
              <th>Confirm</th>
              <th>Deny</th>
            </tr>
          </thead>
          <tbody>
            {userTable}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
