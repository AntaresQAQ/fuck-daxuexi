const oicq = require("oicq");

function init() {
  const client = oicq.createClient(app.config.message.qq, {
    platform: 3,
    log_level: "off",
  });
  client.on("system.login.device", (event)=> {
    console.log("获取设备锁链接: ");
    console.log(event.url);
    console.log("请验证后重启程序");
    process.exit(0);
  }).login(app.config.message.password);
  app.runtimeData.oicqClient = client;
  global.client = client;
}

function bindListener(){
  client.on("message.group",async (event) => {
    if(app.config.message.groupId && event.group_id !== app.config.message.groupId) {
      return;
    }
    if(!RegExp(app.config.message.eventRegex).test(event.raw_message)) {
      return;
    }
    console.log("收到动作消息");
    const [img1,img2] = await app.getImages();
    let msg = app.config.message.sendFormat;
    msg = msg.replace("[img1]",`[CQ:image,file=base64://${img1}]`);
    msg = msg.replace("[img2]",`[CQ:image,file=base64://${img2}]`);
    await event.reply(msg);
    console.log("消息发送成功");
    // await app.runtimeData.oicqClient.sendGroupMsg(event.group_id, msg);
  });
}

module.exports = {
  init,
  bindListener
}
