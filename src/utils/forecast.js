const request = require("request");

const forecast = (longitude = 0, latitude = 0, callback) => {
  const url =
    "https://api.darksky.net/forecast/24d840cce813fe2e9ad164db96f88780/" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(latitude) +
    "?units=si";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("No Network Connectivity", undefined);
    } else if (body.code) {
      callback("Wrong Input", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } Degree Celsius out. The highest and the lowest temperature today is ${
          body.daily.data[0].temperatureHigh
        } & ${
          body.daily.data[0].temperatureLow
        } Degree Celsius. There is a ${body.currently.precipProbability *
          100} % chance of rain.`
      );
    }
  });
};

module.exports = forecast;
