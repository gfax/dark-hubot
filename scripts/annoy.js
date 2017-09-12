// Description:
//   respond to "annoy me"
//
// Author:
//   gfax

module.exports = (robot) => {
  let annoyIntervalId
  const msg = 'AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'

  robot.respond(/annoy me/, (res) => {
    if (annoyIntervalId) {
      res.send(msg)
      return
    }

    res.send('Hey, want to hear the most annoying sound in the world?')
    annoyIntervalId = setTimeout(() => {
      res.send(msg)
    }, 4000)

    // Forget the previous request after a minute
    setTimeout(() => {
      annoyIntervalId = null
    }, 60000)
  })
}
