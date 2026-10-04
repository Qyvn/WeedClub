import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const outDir = '/opt/cursor/artifacts'
const tmpDir = '/tmp/pw-video'
fs.rmSync(tmpDir, { recursive: true, force: true })
fs.mkdirSync(tmpDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: tmpDir, size: { width: 1440, height: 900 } },
})
const page = await context.newPage()

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

await page.getByRole('link', { name: 'Shop retail' }).click()
await page.waitForURL('**/shop')
await page.waitForTimeout(800)

await page.getByRole('button', { name: 'Add to cart' }).first().click()
await page.waitForTimeout(500)

await page
  .getByRole('navigation', { name: 'Primary' })
  .getByRole('link', { name: 'Memberships' })
  .click()
await page.waitForURL('**/memberships')
await page.waitForTimeout(700)

await page.getByRole('button', { name: 'Join Protea' }).click()
await page.waitForTimeout(800)

await page
  .getByRole('navigation', { name: 'Primary' })
  .getByRole('link', { name: 'Wholesale' })
  .click()
await page.waitForURL('**/wholesale')
await page.waitForTimeout(800)

await page.getByRole('button', { name: 'Add wholesale' }).first().click()
await page.waitForTimeout(500)

await page.locator('a[href="/cart"]').click()
await page.waitForURL('**/cart')
await page.waitForSelector('text=Protea member discount')
await page.waitForTimeout(2500)

page.once('dialog', async (dialog) => {
  await dialog.accept()
})
await page.getByRole('button', { name: /Checkout/ }).click()
await page.waitForTimeout(1200)

await context.close()
await browser.close()

const recorded = fs.readdirSync(tmpDir).find((f) => f.endsWith('.webm'))
if (!recorded) throw new Error('No Playwright video produced')

const dest = path.join(outDir, 'stoned_b2c_b2b_membership_checkout.webm')
fs.copyFileSync(path.join(tmpDir, recorded), dest)

// Also make an mp4 sibling for broader playback
const mp4 = path.join(outDir, 'stoned_b2c_b2b_membership_checkout.mp4')
const { spawnSync } = await import('node:child_process')
const result = spawnSync(
  'ffmpeg',
  ['-y', '-i', dest, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', mp4],
  { encoding: 'utf8' },
)
if (result.status !== 0) {
  console.error(result.stderr)
  throw new Error('ffmpeg conversion failed')
}

console.log('saved', dest)
console.log('saved', mp4)
