const puppeteer = require('puppeteer');
const nzhcn = require("nzh/cn");

function sleep() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve();
    }, 1000);
  });
}

async function getInfoPage() {
  const config = app.config.infoPage;
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 640,
      height: 1280,
      isMobile: true,
    },
  });
  const page = await browser.newPage();
  await page.goto(config.url);

  await sleep();

  let node = await page.$(".btn");
  await node.click();
  await sleep();
  node = await page.$$(".cmp-text");
  await node[1].click();
  await sleep();
  node = await page.$$(".cmp-text");
  await node[0].click();
  await sleep();
  node = await page.$(".btn");
  const title = await node.$eval("span",node => node["innerText"]);
  await node.click();
  await sleep();
  node = await page.$$(".cmp-shape");
  await node[3].click();
  await sleep();

  const [name,phone,studentId] = await page.$$("input");
  await name.type(config.name);
  await phone.type(config.phone);
  await studentId.type(config.id);

  const [school] = await page.$$("select");
  const schools = await school.$$eval("option", nodes => nodes.map(
    node => ({
      name: node["innerText"],
      value: node["__preactattr_"].value,
    })
  ));
  const schoolValue = schools.find(item => item.name === config.school).value;
  await school.select("select",schoolValue);

  await sleep();

  const [,college] = await page.$$("select");
  const colleges = await college.$$eval("option", nodes => nodes.map(
    node => ({
      name: node["innerText"],
      value: node["__preactattr_"].value,
    })
  ));
  const collegeValue = colleges.find(item => item.name === config.college).value;
  await college.select("select",collegeValue);

  const image = await page.screenshot({ omitBackground: true });
  await browser.close();
  const number = /(\d+)/g.exec(title)[0];
  return [
    "青年大学习" + title.replace(number, nzhcn.encodeS(parseInt(number))),
    Buffer.from(image).toString("base64")
  ];
}

module.exports = {
  getInfoPage
}
