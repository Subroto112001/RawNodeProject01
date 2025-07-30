/**
 * Title : uptime monitoring Aplication
 * Description : A Restfull api to monito up or down of user defined link
 * */

/**
 * dependencies
 * */
const http = require("http");

// app object - module scafholding

const app = {};

// configuration
app.config = {
    port: 3000
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port no ${app.config.port}`);
        
    })
};

// handle request response
app.handleReqRes = (req, res) => {
  res.end("Hello boss");
};


// start the server
app.createServer()