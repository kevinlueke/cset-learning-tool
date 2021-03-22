import useSWR from 'swr'

export default function useCookie({
} = {}) {
  const { data: cookie, mutate: mutateCookie} = useSWR('/api/cookie')

  return { cookie, mutateCookie }
}
