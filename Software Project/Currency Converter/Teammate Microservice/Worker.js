const fs = require('fs');
const zmq = require("zeromq");
const sock = zmq.socket('pull');

const fileReturn = {
    "value": 1,
    "nameOfCurrency": ""
};

setTimeout(run, 1000);

async function run() {
    sock.connect("tcp://127.0.0.1:7000");
    console.log("Connected to server!");
    console.log("Received stock & currency information!");
    sock.on('message', function(msg) {
        fileReturn["value"] = (JSON.parse(msg.toString()).price * JSON.parse(msg.toString()).quantity);
        switch (JSON.parse(msg.toString()).toCurrency) {
            case 'EURO':
                fileReturn["value"] *= 0.98;
                fileReturn["nameOfCurrency"] = 'European Euro';
                break;

            case 'YEN':
                fileReturn["value"] *= 133.34;
                fileReturn["nameOfCurrency"] = 'Japanese Yen';
                break;

            case 'AUD':
                fileReturn["value"] *= 1.43;
                fileReturn["nameOfCurrency"] = 'Australian Dollar';
                break;

            case 'CAD':
                fileReturn["value"] *= 1.28;
                fileReturn["nameOfCurrency"] = 'Canadian Dollar';
                break;

            case 'KWD':
                fileReturn["value"] *= 0.31;
                fileReturn["nameOfCurrency"] = 'Kuwaiti Dinar';
                break;

            case 'INR':
                fileReturn["value"] *= 79.20;
                fileReturn["nameOfCurrency"] = 'Indian Rupee';
                break;

            case 'JOD':
                fileReturn["value"] *= 0.71;
                fileReturn["nameOfCurrency"] = 'Jordanian Dollar';
                break;

            case 'BHD':
                fileReturn["value"] *= 0.38;
                fileReturn["nameOfCurrency"] = 'Bahranian Dinar';
                break;

            case 'GBP':
                fileReturn["value"] *= 0.82;
                fileReturn["nameOfCurrency"] = 'United Kingdom Sterling Pound';
                break;

            case 'OMR':
                fileReturn["value"] *= 0.38;
                fileReturn["nameOfCurrency"] = 'Omani Rial';
                break;

            default:
                console.log("There's no match!")
        }

        console.log("Sending/writing data back to server!");
        console.log(fileReturn);

        fs.writeFile('./data.json', JSON.stringify(fileReturn), err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    })
}

// Code Reference: https://zeromq.org/languages/nodejs/