require("dotenv").config();

const next = require("next");

const runServer = require("./server.js");

// Next application
const dev = process.env.NODE_ENV !== "server-dev"
  && process.env.NODE_ENV !== "server-prod";
const nextApp = next({ dev });

nextApp.prepare().then(() => {
  runServer(nextApp);
});
