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
        // if the given value is a Date
        if (time.includes("-")) {
            var pastTime = new Date(time);
            if (!pastTime.getTime() || !pastTime.toUTCString()) {
                return res.send({ error: "Invalid Date" });
            }
            return res.send({
                unix: pastTime.getTime(),
                utc: pastTime.toUTCString(),
            });
        }
        // if the give value is in unix format
        if (!isNaN(time)) {
            var pastTime = new Date(parseInt(time));
            if (!pastTime.getTime() || !pastTime.toUTCString()) {
                return res.send({ error: "Invalid Date" });
            }
            return res.send({
                unix: pastTime.getTime(),
                utc: pastTime.toUTCString(),
            });
        }
        // if the given value is in incorrect format
        if (isNaN(time)) {
            return res.send({ error: "Invalid Date" });
        }
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
