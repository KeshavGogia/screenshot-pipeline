const fs = require('fs');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

const websiteUrl = 'https://example.com';
const readmeFilePath = 'README.md';
const screenshotFilePath = 'screenshot.png';

async function captureScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(websiteUrl);
  await page.screenshot({ path: screenshotFilePath });
  await browser.close();
}

async function updateReadme() {
  const timestamp = new Date().toLocaleString();
  const readmeContent = `# Website Screenshot\n\n![Website Screenshot](${screenshotFilePath}?timestamp=${timestamp})`;
  fs.writeFileSync(readmeFilePath, readmeContent);
}

function checkForChanges() {
  // Add logic here to check for changes in the website
  // For simplicity, assume changes are detected every time
  return true;
}

async function captureAndUpdate() {
  if (checkForChanges()) {
    await captureScreenshot();
    await updateReadme();
    exec('git add . && git commit -m "Update screenshot" && git push');
  }
}

module.exports = { captureAndUpdate };
