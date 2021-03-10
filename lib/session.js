import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: 'thisIsASuperSecretPasswordForDevAndTesting',
    cookieName: 'cset-learning-tool',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}
