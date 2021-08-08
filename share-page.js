const puppeteer = require('puppeteer');

function sleep() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve();
    }, 2000);
  });
}


async function getSharePage() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1080,
      height: 1920,
      isMobile: true,
    },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  // noinspection HttpUrlsUsage
  await page.goto(`http://${app.config.server.host}:${app.config.server.port}`);
  await sleep();
  const data = Buffer.from(await page.screenshot({ omitBackground:true })).toString("base64");
  await browser.close();
  return data;
}

module.exports = {
  getSharePage
}
