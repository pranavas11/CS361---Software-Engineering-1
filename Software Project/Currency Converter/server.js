const zmq = require("zeromq");
const sock = zmq.socket('push');
const secondSock = zmq.socket('pull');

const fileSend = require('./currency.json');

let fileReceived = "Initial empty received file";

run();

async function run() {
    sock.bind("tcp://127.0.0.1:7000");
    console.log("Server is ready and listening on port 7000!");
    console.log("\nSending currency JSON data to worker.js...\nJSON Data:");
    console.log(JSON.stringify(fileSend));
    sock.send(JSON.stringify(fileSend)); // sending currency information
}