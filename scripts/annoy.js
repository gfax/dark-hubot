module.exports = (robot) => {
  let annoyIntervalId

  robot.respond(/annoy me/, (res) => {
    if (annoyIntervalId) {
      res.send("AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH")
      return
    }

    res.send("Hey, want to hear the most annoying sound in the world?")
    annoyIntervalId = setInterval(() => {
      res.send(
        "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
        , 1000
      )
    })
  })
}
