
const url = require("url");
const { StringDecoder } = require("string_decoder");

const handeler = {};
const route = require('../Route/route');
const { notfoundHandler } = require("../handelers/routeHandler/notFound.hnadeler");

handeler.handleReqRes = (req, res) => {
  // handle request
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();

  const queryStringObject = parseUrl.query;
  const Headersobject = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realdata = "";
  req.on("data", (buffer) => {
    realdata += decoder.write(buffer);
  });
  req.on("end", () => {
    realdata += decoder.end();
    console.log(realdata);
    res.end("Hello boss");
  });
};
module.exports = handeler;
