const http = require("http");
const ejs = require("ejs");
const fs = require("fs");

function start() {
  const server = http.createServer((req,res)=> {
    fs.readFile("./template.ejs",(err, data) => {
      if(err) {
        res.end();
        return;
      }
      const html = ejs.render(data.toString());
      res.writeHead(200,{ "Content-Type":"text/html;charset=UTF8" });
      res.write(html);
      res.end();
    })
  });
  server.listen(app.config.server.port,app.config.server.host);
  console.log("服务器开始监听");
}

module.exports = {
  start
}
