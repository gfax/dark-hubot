// Description:
//   respond to pingas
//
// Commands:
//   pingas - pongas
//
// Author:
//   gfax

module.exports = (robot) => {
  robot.hear(/pingas$/i, (res) => {
    res.send('pongas')
  })
}
