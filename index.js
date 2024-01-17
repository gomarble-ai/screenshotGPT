const express = require("express");
const fs = require("fs");
const https = require("https");
const {scrapeLogic} = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4430;

https
  .createServer({
    key: fs.readFileSync(__dirname+"/client-key.pem"),
    cert: fs.readFileSync(__dirname+"/client-cert.pem"),
  },
    app)
  .listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`);
  });

app.get("/", (req,res) => {
    res.send("Render Puppeteer server is up and running");
});

app.get("/scrape", (req,res) =>{
    scrapeLogic(res);
})