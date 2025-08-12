const handler = {};
handler.notfoundHandler = (requestProperties, callback) => {
  console.log("sample Handler");
  callback(404, {
    message : "Not Found Url"
  });
};

module.exports = handler;
