import fs from 'fs'

import startBrowser from './src/browser.js'
import { setName } from './src/utils.js'

// Demos
import proximityDoors from './demos/proximityDoors.js'
import imageSequence from './demos/imageSequence.js'

const config = JSON.parse(fs.readFileSync('./config.json'))

// Login and set the bot name
const login = async () => {
  const page = await startBrowser(config.roomURL)
  await page.evaluate(setName, config.botName ?? 'VXBot')
  console.log('connected!')

  // Run demos
  await proximityDoors(page)
  await imageSequence(page)
}

login()