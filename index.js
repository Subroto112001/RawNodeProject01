/**
 * Title : uptime monitoring Aplication
 * Description : A Restfull api to monito up or down of user defined link
 * */

/**
 * dependencies
 * */
const http = require("http");
const { parse } = require("path");
const { buffer } = require("stream/consumers");
const url = require("url")
const {StringDecoder}= require("string_decoder");
const { handleReqRes } = require("./helpers/HandleReqRes");


// app object - module scafholding

const app = {};

// configuration
app.config = {
    port: 3000
};


// handle request response
app.handleReqRes = handleReqRes;



// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port no ${app.config.port}`);
        
    })
};




// start the server
app.createServer()