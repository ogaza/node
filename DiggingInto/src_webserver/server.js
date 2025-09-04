import http from "http";
import staticAlias from "node-static-alias";

const HTTP_PORT = 3001;
const WEB_PATH = ".";

var fileServer = new staticAlias.Server(WEB_PATH, {
  cache: 100,
  serverInfo: "Digging Into Node",
  alias: [
    {
      match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
      serve: "index.html",
      force: true,
    },
    {
      match: /^\/js\/.+$/,
      serve: "<% absPath %>",
      force: true,
    },
    {
      match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
      serve: function onMatch(params) {
        return `${params.basename}.html`;
      },
    },
    {
      match: /[^]/,
      serve: "404.html",
    },
  ],
});

var server = http.createServer(hanleRequest);
server.listen(HTTP_PORT);
console.log(`Listening on http://localhost:${HTTP_PORT}...`);

async function hanleRequest(req, res) {
  if (/\/get-records\b/.test(req.url)) {
    await handleGetRecordsReq(req, res);

    return;
  }

  // console.log(req.url);

  fileServer.serve(req, res);
}

async function handleGetRecordsReq(req, res) {
  // await delay(1000);

  let records = (await getAllRecords()) || [];

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Cache-Control": "max-age: 0, no-cache",
  });
  res.end(JSON.stringify(records));
}

function getAllRecords() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([{ id: 1, data: "one" }]);
    }, 100);
  });
}
