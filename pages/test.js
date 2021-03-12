import useUser from '../lib/useUser'
import withSession from '../lib/session'

export default function Test() {
  const { user } = useUser( { redirectTo: '/' } )

  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  return (
    <p>Hello {user.name}</p>
  )
}
