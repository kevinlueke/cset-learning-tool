import useUser from '../lib/useUser'

export default function Test() {
  const { user } = useUser( { redirectTo: '/' } )

  if (!user || user.isLoggedIn === false) {
    return <p>Loading...</p>
  }

  return (
    <p>Hello {user.name}</p>
  )
}
