let express = require("express");
let bodyParser = require("body-parser");
let authRoute = require("./routes/authRoute");
let userRoute = require("./routes/userRoute");
let wordcountRoute = require("./routes/wordcountRoute");
require("dotenv").config();

let app = express();
app.use(bodyParser.json());

app.use("/api/user", authRoute.router);
app.use(authRoute.checkToken);
app.use("/api/user", userRoute);
app.use("/", wordcountRoute);

function start() {
  app.listen(process.env.PORT, function() {
    console.log("server started");
  });
}

exports.app = app;
exports.start = start;
