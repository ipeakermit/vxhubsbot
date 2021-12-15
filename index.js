const startBrowser = require('./src/browser')
const utils = require('./src/utils')

const login = async () => {
  const page = await startBrowser('https://hubs.mozilla.com/baRZEkr/adept-sharp-commons')
  await page.evaluate(utils.setName, 'VXBot')
}

login()