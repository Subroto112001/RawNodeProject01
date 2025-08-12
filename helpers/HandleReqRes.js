const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../Routes/route");
const {
  notfoundHandler,
} = require("../handelers/routeHandler/notFound.handler");
notfoundHandler;

const handler = {};

handler.handleReqRes = (req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  // Request properties
  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  // Decode incoming data
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    let parsedBody = {};
    try {
      parsedBody = realData ? JSON.parse(realData) : {};
    } catch (err) {
      parsedBody = realData; // fallback to raw string if not JSON
    }
    requestProperties.body = parsedBody;
    // Choose the route handler
    const chosenHandler = routes[trimmedPath]
      ? routes[trimmedPath]
      : notfoundHandler;

    // Execute the handler
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
