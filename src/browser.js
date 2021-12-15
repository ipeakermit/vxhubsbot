const puppeteer = require('puppeteer')

const start = async url => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const context = browser.defaultBrowserContext()
  context.overridePermissions('https://hubs.mozilla.com', ['microphone', 'camera'])
  context.overridePermissions('https://hubs.link', ['microphone', 'camera'])

  let parsedUrl = new URL(url)
  parsedUrl.searchParams.set('bot', 'true')

  await page.goto(parsedUrl.toString(), { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => NAF.connection.isConnected())

  return page
}

module.exports = start