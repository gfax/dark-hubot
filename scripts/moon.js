// Description:
//   Replies with the moon's current phase
//
// Commands:
//   hubot moon - Replies with the moon's current phase

const sunCalc = require('suncalc')
const moons = [
  '\uD83C\uDF18',
  '\uD83C\uDF17',
  '\uD83C\uDF16',
  '\uD83C\uDF15',
  '\uD83C\uDF14',
  '\uD83C\uDF13',
  '\uD83C\uDF12',
  '\uD83C\uDF11'
]

module.exports = (robot) => {
  robot.respond(/moon/i, (msg) => {
    const { phase } = sunCalc.getMoonIllumination(new Date())
    const idx = Math.floor(moons.length * phase)
    msg.send(`${moons[idx]}  ${Math.round(phase * 10000)/100}%`)
  })
}
