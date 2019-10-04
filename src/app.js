const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Defines path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Satyaki Roy"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Satyaki Roy"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Satyaki Roy"
  });
});

//API consumption
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an Address"
    });
  }

  geoCode(
    req.query.address,
    (error, { Latitude, Longitude, Location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(Latitude, Longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        console.log(Location);
        console.log(forecastData);
        res.send({
          forecast: forecastData,
          location: Location,
          addressGiven: req.query.address
        });
      });
    }
  );

  // console.log("req.query is : " + req.query);
  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'India',
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search team"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "ERROR",
    error: "Help article not found",
    name: "Satyaki Roy"
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "ERROR",
    error: "Page not found",
    name: "Satyaki Roy"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
