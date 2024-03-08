const fs = require('fs');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

const websiteUrl = 'https://google.com';
const readmeFilePath = 'README.md';
const screenshotFilePath = 'screenshot.png';

let previousScreenshot = null;

async function captureScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(websiteUrl);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
}

async function updateReadme(screenshot) {
  const timestamp = new Date().toLocaleString();
  const readmeContent = `# Website Screenshot\n\n![Website Screenshot](${screenshotFilePath}?timestamp=${timestamp})`;
  fs.writeFileSync(readmeFilePath, readmeContent);
}

async function checkForChangesAndCapture() {
  const currentScreenshot = await captureScreenshot();
  
  if (previousScreenshot !== null && !areScreenshotsEqual(previousScreenshot, currentScreenshot)) {
    await updateReadme(currentScreenshot);
    exec('git add . && git commit -m "Update screenshot" && git push');
  }

  previousScreenshot = currentScreenshot;
}

function areScreenshotsEqual(screenshot1, screenshot2) {
  // Compare screenshots byte by byte
  return Buffer.compare(screenshot1, screenshot2) === 0;
}

// Run the function initially
checkForChangesAndCapture();

// Schedule to run the function periodically (e.g., every 1 hour)
setInterval(checkForChangesAndCapture, 360); 

module.exports = { checkForChangesAndCapture };
