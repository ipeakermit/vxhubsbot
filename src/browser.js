import puppeteer from 'puppeteer'

const start = async url => {
  console.log('starting browser')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  // Enable permissions required
  const context = browser.defaultBrowserContext()
  context.overridePermissions('https://hubs.mozilla.com', ['microphone', 'camera'])
  context.overridePermissions('https://hubs.link', ['microphone', 'camera'])

  // Create the room URL
  let parsedUrl = new URL(url)
  parsedUrl.searchParams.set('bot', 'true')

  // Load the room
  console.log('loading room')
  await page.goto(parsedUrl.toString(), { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => NAF.connection.isConnected())

  return page
}

export default start