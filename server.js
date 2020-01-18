'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');
const pg =require('pg');
const app = express();

// database connection set up
const client = new pg.Client(process.env.DATABASE_URL);
client.on ('error', err => console.error(err));

let locations = {};


const PORT = process.env.PORT || 3001;

// use corss to allow to past data to front end

app.use(cors());
app.get('/location', locationHandler);
// app.getMaxListeners('/events', enventfulHandler);


// define routes
function locationHandler(request, response) {


  // const dataArray = require('./data/geo.json');
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;

  let SQL = 'select * from locations where search_query = $1;';
  let values = [city];

  client.query(SQL, values)
    .then(result => {

      console.log(result.rows);

      if(result.rows.length > 0){
        console.log('result foud in data base');
        response.send(result.rows[0]);
      }

      // hit this condition when there isn't city searched in database
      else {
        console.log('did not find result going to superagent api');
        const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;

        superagent.get(url)
          .then(data => {
            // add to DB
            // const geoData = data.body[0];
            const location = new Location(city, data.body[0]);
            // locations[url] = location;
            let sql = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
            let safeValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];
            client.query(sql, safeValues);
            response.status(200).send(location);
          })
          .catch(() => {
            errorHandler('If you did not get result. Please, try again', request, response);
          });
      }

    });


}






app.get('/weather', (request, response) => {

  let latitude = request.query.latitude;
  let longitude = request.query.longitude;
  // let {latitude, longitude} = request.query;

  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;

  superagent.get(url)
    .then(data => {
      const dailyWeather = data.body.daily.data.map(day => {
        return new MapWeather(day);
      });
      response.status(200).send(dailyWeather);
    })
    .catch(() => {
      errorHandler('If you did not get result. Please, try again', request, response);
    });

});


app.get('/events', (request, response) => {
  let key = process.env.EVENTFUL_API_KEY;
  let {search_query }= request.query;
  const eventDataUrl =`http://api.eventful.com/json/events/search?keywords=music&location=${search_query}&app_key=${process.env.EVENTFUL_API_KEY}`;

  superagent.get(eventDataUrl)
    .then(eventData => {
      let eventMassData = JSON.parse(eventData.text);
      let localEvent =eventMassData.events.event.map(thisEventData => {
        return new NewEvent(thisEventData);
      });
      response.status(200).send(localEvent);
    })
    .catch(() => {
      errorHandler('If you did not get result. Please, try again', request, response);
    });

});


// Define function




function Location(city, localData) {
  this.search_query = city;
  this.formatted_query = localData.display_name;
  this.latitude = localData.lat;
  this.longitude = localData.lon;
}



function MapWeather(dailyForecast) {
  this.forecast = dailyForecast.summary;
  this.time = new Date(dailyForecast.time *1000).toDateString();
}

function errorHandler(string, response) {
  response.status(500).send(string);
}

function NewEvent(thisEventData) {
  this.name = thisEventData.title;
  this.event_date = thisEventData.start_time.slice(0,10);
  this.link = thisEventData.url;
  this.summary = thisEventData.description;

}

// Make sure the server is listening for requests
// app.listen(PORT, () => console.log(`Never Give up ${PORT}`));

// connect to BD and Start the web server
client.connect()
  .then(
    app.listen(PORT, () => {
      console.log('Never Give up', PORT);
    })
  )
  .catch(err => console.error(err));
