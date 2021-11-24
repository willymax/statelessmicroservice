'use strict'
/**
 * NOT NEEDED. This was just an opproach to explore/practice the json-patch
 */
const fs = require('fs')
const path = require('path')
const FILE_NAME = 'member.json'

function load() {
  let rawdata = fs.readFileSync(path.resolve(__dirname, `./${FILE_NAME}`))
  let member = JSON.parse(rawdata)
  return member
}
function save(member) {
  let data = JSON.stringify(member, null, 2)
  console.log(data)
  fs.writeFile(path.resolve(__dirname, `./${FILE_NAME}`), data, (err) => {
    if (err) throw err
    console.log('Member stored in file')
  })
}
module.exports = { load, save }
