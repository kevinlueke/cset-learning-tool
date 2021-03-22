import useUser from '../lib/useUser'
import useCookie from '../lib/useCookie'
import TestCookies from '../components/test-cookies'

export default function Test() {
  const { user } = useUser( { redirectTo: '/' } )
  const { cookie } = useCookie({})

  if (!user || user.isLoggedIn === false || !cookie) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>Hello {user.name}</p>
      <TestCookies/>
      <p>The current cookie is: {cookie.info}</p>
    </div>
  )
}
