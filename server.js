// server.js

// First, run 'npm install pusher express body-parser cookie-parser'
// Then run this file with 'node server.js'
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "APP_ID", // Replace with 'app_id' from dashboard
    key: "APP_KEY", // Replace with 'key' from dashboard
    secret: "APP_SECRET", // Replace with 'secret' from dashboard
    cluster: "APP_CLUSTER", // Replace with 'cluster' from dashboard
    useTLS: true,
});
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    // Primitive auth: the client self-identifies. In your production app,
    // the client should provide a proof of identity, like a session cookie.
    const user_id = req.cookies.user_id;
    const presenceData = { user_id };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));