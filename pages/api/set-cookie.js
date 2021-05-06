import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { info } = await req.body
  const cookie = { info: info }

  try {
    req.session.set('cookie', cookie)
    await req.session.save()
    res.json(test)
    res.end()
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }

})
