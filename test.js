//setup express
const express = require('express');
const app = express();
const port = 1000;
//setup zeromq
var zmq = require("zeromq"),
    sock = zmq.socket("pub");
//bind a publisher to port 3000 all IP addresses
sock.bindSync("tcp://*:3000");
console.log("ZeroMQ h Publisher bound to port 3000");
//Get the hostname of the node
var os = require("os");
var myhostname = os.hostname();
//print the hostname
console.log(myhostname);
//route for get page /
app.get('/', (req, res) => {
    //Send the response to the browser
    res.send('Hello this is node ' + myhostname);
})
//bind node to the port
app.listen(port, () => {
    console.log(`Express listening at port ` + port);
})
//based on the interval publish a status message
setInterval(function () {
    console.log("sending alive");
    sock.send(["status", myhostname + "=alive"]);
}, 500);