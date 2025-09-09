import http from "http";
import express from "express";

const HTTP_PORT = 3001;
const WEB_PATH = ".";

var app = express();
var server = http.createServer(app);

defineRoutes(app);
server.listen(HTTP_PORT);
console.log(`Server running on http://localhost:${HTTP_PORT}`);

function defineRoutes(app) {
  app.get(/\/get-records\b/, async function getRecords(req, res) {
    let records = (await getAllRecords()) || [];

    // res.json(records);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "max-age: 0, no-cache");
    res.writeHead(200);
    res.end(JSON.stringify(records));
  });

  app.use(function rewriter(req, res, next) {
    if (/^\/(?:index\/?)?(?:[?#].*$)?$/.test(req.url)) {
      req.url = "/index.html";
    } else if (/^\/js\/.+$/.test(req.url)) {
      next();
      return;
    } else if (/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/.test(req.url)) {
      let [, basename] = req.url.match(/^\/([\w\d]+)(?:[\/?#].*$)?$/);
      req.url = `${basename}.html`;
    }

    next();
  });

  var fileServer = express.static(WEB_PATH, {
    maxAge: 100,
    setHeaders(res) {
      res.setHeader("Server", "Digging into Node");
    },
  });

  app.use(fileServer);

  app.get(/\.html$/, function friendly404(req, res, next) {
    req.url = "/404.html";
    fileServer(req, res, next);
  });
}

function getAllRecords() {
  return Promise.resolve([{ id: 1, data: "one" }]);
  // return new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res([{ id: 1, data: "one" }]);
  //   }, 100);
  // });
}
