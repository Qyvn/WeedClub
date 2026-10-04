import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'

const outDir = '/opt/cursor/artifacts/screenshots'
fs.mkdirSync(outDir, { recursive: true })

const headed = process.argv.includes('--headed')
const demo = process.argv.includes('--demo')

const browser = await chromium.launch({
  headless: !headed,
  args: headed ? ['--window-size=1440,900'] : [],
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()

async function shot(name) {
  const file = path.join(outDir, `${name}.png`)
  await page.screenshot({ path: file, fullPage: false })
  console.log('saved', file)
}

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await shot('home_hero')

if (demo) {
  await page.getByRole('link', { name: 'Shop retail' }).click()
  await page.waitForURL('**/shop')
  await page.waitForTimeout(600)
  await shot('shop_retail')

  await page.getByRole('button', { name: 'Add to cart' }).first().click()
  await page.waitForTimeout(400)

  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Memberships' }).click()
  await page.waitForURL('**/memberships')
  await page.waitForTimeout(500)
  await shot('memberships')

  await page.getByRole('button', { name: 'Join Protea' }).click()
  await page.waitForTimeout(500)

  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Wholesale' }).click()
  await page.waitForURL('**/wholesale')
  await page.waitForTimeout(500)
  await shot('wholesale')

  await page.getByRole('button', { name: 'Add wholesale' }).first().click()
  await page.waitForTimeout(400)

  await page.locator('a[href="/cart"]').click()
  await page.waitForURL('**/cart')
  await page.waitForTimeout(700)
  await shot('cart_with_member_discount')

  page.once('dialog', async (dialog) => {
    console.log('dialog:', dialog.message())
    await dialog.accept()
  })
  await page.getByRole('button', { name: /Checkout/ }).click()
  await page.waitForTimeout(800)
} else {
  await page.goto('http://127.0.0.1:5173/shop', { waitUntil: 'networkidle' })
  await shot('shop_retail')
  await page.goto('http://127.0.0.1:5173/wholesale', { waitUntil: 'networkidle' })
  await shot('wholesale')
  await page.goto('http://127.0.0.1:5173/memberships', { waitUntil: 'networkidle' })
  await shot('memberships')
}

await browser.close()
console.log('done')
