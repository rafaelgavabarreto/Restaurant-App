"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const twilio      = require('twilio');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");


//send a Twilio SMS <<<<<<<<
var accountSid = 'AC12bd3680ab7bcacdea48e1728c8788e2'; // Your Account SID from www.twilio.com/console
var authToken = '690e49b366be07f27288491d29bdd4b1';   // Your Auth Token from www.twilio.com/console
var twilioClient = new twilio(accountSid, authToken);

// SMS TO CUSTOMER
var sendTextMessage = function(customer){
  twilioClient.messages.create({
      body: 'Your order has been accepted. Estimated time for pick up is 30 mins.',
      to: customer.phone,  // Text this number Twilio registered numbers: Ash +14165693279 Rafa +16472033511 Dan +12893394716
      from: '+16476997021' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));

};

// SMS TO OWNER
var sendOwnerMessage = function(){
  twilioClient.messages.create({
      body: 'You have received an order.',
      to: '++14165693279',  // Text this number Twilio registered numbers: Ash +14165693279
      from: '+16476997021' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
};


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  // req.session.userID = generateRandomString();
  res.render("index");
});

// Home page form submit which triggers twilio <<<<<<

app.get("/sms", (req, res) => {
 res.redirect("/")
});

app.post("/sms", (req, res) => {
 var customer = {
  name: req.body.fname,
  phone: req.body.phone
 };
 sendTextMessage(customer);
 sendOwnerMessage();
});

//Create a 6 digit random Number <<<<
function generateRandomString() {
  var generate = "";
  var randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i <= 6; i ++){
    generate += randomChar.charAt((Math.floor(Math.random() * randomChar.length)));

  }
   return console.log("session number: " + generate);
}

//Item count from AJAX
app.post("/items/add", (req, res) => {
  var kart = req.body.itemId;
  res.status('success');
  console.log(kart);
});

//Load checkout page
app.get("/checkout", (req, res) => {
  res.redirect("checkout");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
