const puppeteer = require('puppeteer');

function sleep() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve();
    }, 1000);
  });
}


async function getSharePage() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1080,
      height: 1920,
      isMobile: true,
    },
  });
  const page = await browser.newPage();
  // noinspection HttpUrlsUsage
  await page.goto(`http://${app.config.server.host}:${app.config.server.port}`);
  await sleep();
  return Buffer.from(await page.screenshot({ omitBackground:true })).toString("base64");
}

module.exports = {
  getSharePage
}
