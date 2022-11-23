const fs = require('fs');
var webpage = fs.readFileSync("./webpage.html");
var faq = fs.readFileSync("./faq.html");
var css = fs.readFileSync("./styles.css");
var js = fs.readFileSync("./currency_converter.js");
var jsonData = fs.readFileSync("./data.json");
var http = require('http');

// Note: "statusCode = 200" means the response is a success (i.e., webpage has been loaded sucessfully)

var server = http.createServer(function(request, response) {
    if (request.url === "/") { // load the main webpage
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(webpage);
        return;
    }

    if (request.url === "/faq.html") { // load the faq webpage
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(faq);
        return;
    }

    if (request.url === "/styles.css") { // load the css file
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/css");
        response.end(css);
        return;
    }

    if (request.url === "/currency_converter.js") { // load the script file
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/javascript");
        response.end(js);
        return;
    }

    if (request.url === "/data.json") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(jsonData);
        return;
    }

    // note: user selected currency data from the dropdown menu in the webpage will be written to a JSON file to process and display currency information
    if (request.url === "/json_data") {
        request.on("data", chunk => {
            var json = JSON.parse(chunk.toString());

            fs.writeFile('./currency.json', JSON.stringify(json, null, 4), (err) => {
                if (err) {
                    console.log(`\nError writing file: ${err}`);
                } else {
                    console.log(`\nCurrency.json file is written successfully!`);
                }
            });
            console.log("\nCurrency data:", chunk.toString());
        });
        response.end("Received GET request.");
    }
});

server.listen(5000, () => { console.log("\nWebsite is available at localhost:5000/") });

// Note: run this script file in the terminal (i.e., run node currency_server.js or nodemon currency_server.js) first in your terminal and enter the URL "localhost:5000" in a new tab in your browser.