import fs from 'fs'

import startBrowser from './src/browser.js'
import { setName } from './src/utils.js'
import ROSLIB from 'roslib'

// Demos
import proximityDoors from './demos/proximityDoors.js'
import imageSequence from './demos/imageSequence.js'
//import rosie from './demos/rosie.js'
import loadFireExt from './demos/fireExt.js'

const config = JSON.parse(fs.readFileSync('./vxlab_config.json'))

// Login and set the bot name
const login = async () => {
  const page = await startBrowser(config.roomURL)
  await page.evaluate(setName, config.botName ?? 'VXBot')
  console.log('connected!')

  // Run demos
  await loadFireExt(page)
  //await imageSequence(page)
  //await proximityDoors(page)
}

login()
