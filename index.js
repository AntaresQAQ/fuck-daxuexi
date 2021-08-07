const {getInfoPage} = require("./info-page");
const {getSharePage} = require("./share-page");
const server = require("./page-server");
const message = require("./message");

global.app = {
  runtimeData:{
    sharePageTitle: "青年大学习",
    sharePageTime: "00:00",
    oicqClient: null,
  },
  async getImages() {
    console.log("开始构造第一张截图");
    const [title,image1] = await getInfoPage();
    const time = new Date();
    this.runtimeData.sharePageTitle = title;
    this.runtimeData.sharePageTime = `${time.getHours()}:${time.getMinutes()}`;
    console.log("开始构造第二张截图");
    const image2 = await getSharePage();
    return [image1, image2];
  },
  run() {
    this.config = require("./config.json");
    server.start();
    message.init();
    message.bindListener();
    // await this.getImages();
  }
}


app.run()
