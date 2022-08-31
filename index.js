import fs from 'fs'

import startBrowser from './src/browser.js'
import { setName } from './src/utils.js'
import ROSLIB from 'roslib'

// Demos
import proximityDoors from './demos/proximityDoors.js'
import imageSequence from './demos/imageSequence.js'
import rosie from './demos/rosie.js'

import { ANSIColor, textWithColor, routeLogsToContainer } from './puppet_logging.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

// Login and set the bot name
const login = async () => {
  console.log("=============================")
  const page = await startBrowser(config.roomURL)
  await page.evaluate(setName, config.botName ?? 'VXBot')
  console.log(textWithColor('setup done.\n', ANSIColor.Green));

  // forward puppeteer logs to here
  routeLogsToContainer(page)
  
  // Run demo
  await proximityDoors(page)

  //await rosie(page)
  //await imageSequence(page)
}



login()
