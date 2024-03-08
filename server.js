// const express = require("express");
// const colors = require("colors");
// const app = express();

// const checkRouter = require("./routes/check");


// const PORT = process.env.PORT || 8000;

// app.get("/check",checkRouter);

// app.listen(PORT,() => {
//     console.log(colors.brightYellow(`Server listening on PORT : ${PORT}`));
//     console.log(colors.brightCyan(`http://localhost:${PORT}`));
// })
const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

const websiteUrl = 'https://chat.openai.com';
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

app.get('/', async (req, res) => {
  if (checkForChanges()) {
    await captureScreenshot();
    await updateReadme();
    exec('git add . && git commit -m "Update screenshot" && git push');
    res.send('Screenshot captured and readme updated.');
  } else {
    res.send('No changes detected.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
