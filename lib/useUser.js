import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
  allowed = [1, 2, 3, 4, 5],
} = {}) {
  const { data: user, mutate: mutateUser} = useSWR('/api/user')

  useEffect(() => {
    if (!redirectTo || !user) return

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn) ||
      (!allowed.includes(user?.access))
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
