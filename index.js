const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const date = require("dateformat");
const errorHandler = require("errorhandler");
const app = express();
require("dotenv").config({ path: "./.gitignore/.env" });

let now = new Date();
let weekDay = date(now, "dddd");
const apiKey = process.env.API_KEY;
console.log();

let week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=chennai`;
let pageWeek = [];
let status = "pending";
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

for (let i = 0; i < week.length; i++) {
  if (status == "pending") {
    if (weekDay === week[i]) {
      console.log(i);

      pageWeek.push(week[i + 1], week[i + 2], week[i + 3], week[i + 4]);
      status = "done";
    }
  }
}
console.log(pageWeek);

app.post("/city", async (req, res) => {
  try {
    city = req.body.city;

    console.log(req.body.city);
    url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`;
    const response = await fetch(url, { method: "get" });
    const current = await response.json();
    let typeCurrent = typeof current;
    console.log(current);
    if (typeCurrent == "undefined") {
      throw "error";
    }
    res.render("home", { OD: current, DD: pageWeek });
    // console.log(current);
  } catch (error) {
    res.render("error");
  }
});

app.get("/", async (req, res) => {
  try {
    let city = "madurai";
    url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`;
    const response = await fetch(url, { method: "get" });
    const current = await response.json();
    res.render("home", { OD: current, DD: pageWeek });
    // console.log(res);
  } catch (error) {
    res.render("error");
  }
});
function handleError(err, req, res, next) {
  if (err) {
    res.render("error");
  }

  next(err);
}
app.use(handleError);
app.listen(process.env.PORT || 2000, () => {
  console.log(`port is ${process.env.PORT}`);
});

// //* ***********************HANDLING PROMISES USING THEN************************ */
// app.get('/', (req, res) => {

//     fetch(url, { method: "get" })
//         .then(res => res.json())
//         .then((data) => { result = data; }).
//         then(() => { res.render('home', { OD: result.location.region }) })
// })

//*****************************RESOLVING PROMISES USING ASYNC AWAIT *********************/
// app.get('/', (req, res) => {

//     url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
//     async function fetchData() {
//         const response = await fetch(url, { method: "get" });
//         const current = await response.json();
//         return current
//     }

//     fetchData().then((result) => {
//         res.render('home', { OD: result })
//         console.log(result.current.condition.icon);
//     })
// })
