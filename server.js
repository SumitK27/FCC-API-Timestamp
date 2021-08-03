// server.js
// where your node app starts

// init project
var express = require("express");
const dotenv = require("dotenv");
dotenv.config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api/:time?", function (req, res) {
    const time = req.params.time;
    // if no value is provided
    if (!time) {
        var currentTime = new Date();
        return res.send({
            unix: currentTime.getTime(),
            utc: currentTime.toUTCString(),
        });
    } else {
        if (!isNaN(time)) {
            console.log("Running 1");
            var pastTime = new Date(parseInt(time));
            if (!pastTime.getTime() || !pastTime.toUTCString()) {
                console.log("Running 1.1");
                return res.send({ error: "Invalid Date" });
            }
            /* 1451001600000 */
            /* 2015 - Incorrect */
            return res.send({
                unix: pastTime.getTime(),
                utc: pastTime.toUTCString(),
            });
        } else if (isNaN(Date.parse(time))) {
            console.log("Running 2");
            var validDate = new Date(time);
            if (validDate.toString() || Date.parse(validDate)==false) {
                /* something */
                /* 2015-13  */
                /* 2015-13-27 */
                return res.send({ error: "Invalid Date" });
            }
            return res.send({
                unix: validDate.getTime(),
                utc: validDate.toUTCString(),
            });
        } else if (!isNaN(Date.parse(time))) {
            console.log("Running 3");
            /* 2015-12-25 */
            /* 2015-03 */
            /* 2015-Dec-27 - Incorrect 26 Dec */
            /* 2015-Dec - Incorrect 30 Nov */
            /* Sun, 27 Dec 2015 18:30:00 GMT */
            var validDate = new Date(time);
            return res.send({
                unix: validDate.getTime(),
                utc: validDate.toUTCString(),
            });
        } else {
            console.log("Running 4");
            return res.send({ error: "Invalid Date" });
        }
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
