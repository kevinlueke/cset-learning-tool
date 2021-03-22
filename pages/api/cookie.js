import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const cookie = req.session.get('cookie')

  if (cookie) {
    res.json({
      ...cookie
    })
  } else {
    res.json({
      info: 'there is no cookie',
    })
  }
})
