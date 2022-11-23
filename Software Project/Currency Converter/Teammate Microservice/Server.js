const zmq = require("zeromq");
const sock = zmq.socket('push');

const fileSend = require('./info.json');

run();

async function run() {
    sock.bind("tcp://127.0.0.1:7000");
    console.log("Server is ready and listening on port 7000!");
    send();
}

async function send() {
    console.log("About to send stock & currency parameter JSON data to user!");
    sock.send(JSON.stringify(fileSend)); // sending stock/currency information
}

// Code Reference: https://zeromq.org/languages/nodejs/