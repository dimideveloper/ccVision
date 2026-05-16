import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const outDir = 'c:/Users/Dimi/Documents/ccVision/local-screenshots';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${outDir}/clone-hero.png` });
await page.evaluate(() => window.scrollTo(0, 2800));
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/clone-mid.png` });
await browser.close();
console.log('done');
