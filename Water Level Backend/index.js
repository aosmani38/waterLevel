// index.js
// This is our main server file
const express = require("express");
const app = express();
const fetch = require("cross-fetch");

const bodyParser = require('body-parser');
// const { response } = require("express");
// const { json } = require("express/lib/response")

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// No static server or /public because this server
// is only for AJAX requests
app.use(bodyParser.json());


app.post("/query/getList", async function(request, response, next) {
  console.log("getting data");
  const ids = ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"]
  let target_data = []
  
  console.log("BODY:  ",request.body.month)

  for(i = 0; i < ids.length;i++){
    let target = await lookupWaterData(ids[i],request.body.month, request.body.year)
    console.log(target);
    target_data.push(target)
  }
  
  // console.log("DATAAAA: ",target_data)
  response.json(target_data);
  
});

app.use(function (request, response) {
  response.status(404);
  response.send("Backend cannot answer");
})

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function lookupWaterData(id, month, year) {
  
  const api_url =  `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${id}&SensorNums=15&dur_code=M&Start=${year}-${month}&End=${year}-${month}`;
  
  // send it off
  let fetchResponse = await fetch(api_url);
  let data = await fetchResponse.json();
  return data;
}

