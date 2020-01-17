# lab-07

Author: Blandine Dasilveira

Version: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

 Overview
The city explorer projet is a project for the Back end to give data to the front End, and that will allow user to request weather

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

Architecture
BACK End will utilizes JavaScript and some libraries
- Node.js
- Express.js
- Dotenv
- Cors
- SuperAgent

Change Log

01-04-2020 12:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

- Credits and Collaborations
_ Eugene Monnier
_ JIm
_ Robert nielson


- SET UP REPO:
.env - with your PORT. Make sure this file is in your .gitignore.
README.md - with documentation regarding your lab and its current state of development. Check the "documentation" section below for more details on how that should look AT MINIMUM
.gitignore - with standard NodeJS configurations
.eslintrc.json - with Code 301 course standards for the linter
package.json - with all dependencies and any associated details related to configuration. The dependencies needed for today's lab include: express, dotenv, and cors.
Note that the package-lock.json file is automatically created when dependencies are installed and ensures that future installations of the project use the same versions of the dependencies.
data directory - containing geo.json and darksky.json
Deploy your basic express server to Heroku.

Number and name of feature: Set up

Estimate of time needed to complete: 20 mn

Start time: 09:30

Finish time: 09:50

Actual time needed to complete: 

- FEATURE 1

NOTE: Do this first with the JSON data file, before the following User Stories that refactor the code to an API call.

Given that a user enters a valid location in the input

When the user clicks the "Explore!" button

Then the data will be rendered in the same format every time

Refactor your getWeather callback to use .map and send the resulting array as your response to the client. Continue to use .map for the remainder of labs 7, 8, and 9.
Redeploy your application.

Number and name of feature: Feature 1

Estimate of time needed to complete: 26

Start time: 10:40

Finish time: 11:06

Actual time needed to complete: _____

- FEATURE 2
Given that a user enters a valid location in the input

When the user clicks the "Explore!" button

Then the map will be populated with the location centered on the latitude and longitude of the search query

Endpoint:
/location

Example Response:

{
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}

Add an environment variable to your server named GEOCODE_API_KEY, and use it appropriately in your code.
Your app should have a route with a method of get and a path of /location. Update the route callback to invoke a function to convert the search query to a latitude and longitude. The function should make a Superagent-proxied request to the Google Maps Geocoding API.
Return an object which contains the necessary information for correct client rendering. See the sample response.
Deploy your application.
Confirm that your route is responding as expected by entering your deployed backend URL on the City Explorer app's welcome page. Then search for a location.

Number and name of feature: Feature 2

Estimate of time needed to complete: 1 hour

Start time: 11:00

Finish time: 12:10

Actual time needed to complete: _____


- FEATURE 3
Given that a user enters a valid location in the input

When the user clicks the "Explore!" button

Then the weather forecast for the upcoming eight days will be displayed in the browser

Endpoint:
/weather

Example Response:

[
  {
    "forecast": "Partly cloudy until afternoon.",
    "time": "Mon Jan 01 2001"
  },
  {
    "forecast": "Mostly cloudy in the morning.",
    "time": "Tue Jan 02 2001"
  },
  ...
]

Add an environment variable to your server named WEATHER_API_KEY, and use it appropriately in your code.
Your app should have a route with a method of get and a path of /weather. The callback should make a Superagent-proxied request to the Dark Sky API for weather information. You will need to include in this request the latitude and longitude sent from the client in the query parameters.
Using each weather object of the result, return an array of objects for each day of the response which contains the necessary information for correct client rendering. See the sample response.
Deploy your application.
Confirm that your route is responding as expected by entering your deployed backend URL on the City Explorer app's welcome page. Then search for a location. Verify weather data is displayed properly.

Number and name of feature: Feature 3

Estimate of time needed to complete: 1 hour

Start time: 12:20

Finish time: 1:34

Actual time needed to complete: _____


- FEATURE 4


Given that a user enters a valid location in the input

When the user clicks the "Explore!" button

Then the first twenty events hosted in the area will be displayed in the browser

Endpoint:
/events

Example Response:

[
  {
    "link": "http://seattle.eventful.com/events/seattle-code-101-explore-software-development-/E0-001-126675997-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "name": "Seattle Code 101: Explore Software Development",
    "event_date": "Sat Dec 7 2019",
    "summary": "Thinking about a new career in software development? Start here! In this one-day workshop, you&#39;ll get a taste of a day in the life of a software developer. Code 101 helps you learn what it’s like to be a software developer through a day-long immersive course for beginners that focuses on front-end web development technologies. "
  },
  {
    "link": "http://seattle.eventful.com/events/geekzonehosting-raspberry-pi-jam-session-code-c-/E0-001-121109275-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
    "name": "GeekZoneHosting Raspberry Pi Jam Session & Code Carnival 2019",
    "event_date": "Sat Dec 7 2019",
    "summary": "Join fellow coders, builders, and Raspberry Pi makers in an 8 hour all day event Jam Session builder and code-a-thone to celebrate computer science education week 2019."
  },
  ...
]
Features:
Delete
0%
Add an environment variable to your server named EVENTFUL_API_KEY, and use it appropriately in your code.
Create a route with a method of get and a path of /events. The callback should make a Superagent-proxied request to the Ticketmaster API using the necessary location information.
Create a corresponding constructor function for the result.
For each event in the result, return an object which contains the necessary information for correct client rendering. See the sample response.
Use your existing error handler function.
Redeploy your application.
Confirm that your route is responding as expected by entering your deployed backend URL on the City Explorer app's welcome page. Then search for a location. Verify event data is displayed properly.


Number and name of feature: Feature 4

Estimate of time needed to complete: 

Start time: 

Finish time: 

Actual time needed to complete: _____

## lab-08
- FEATURE 1
Install and require the NPM PostgreSQL package pg in your server.js file.
Add an environment variable to your server named DATABASE_URL, and use it appropriately in your code.
- Mac users: postgres://localhost:5432/DBNAME
- Windows and Linux users: postgres://USER:PASSWORD@DOMAIN:PORT/DBNAME (You should have retained the user/password from the pre-work for this course.)
Start the express server only after the database connection is established.
Add an item
Table Creation
Delete
0%
Create a file called schema.sql which contains correct SQL queries to drop all of your tables and create them, if they do not already exist. All tables should be created in the same database.
Execute this file from the command line with the following syntax: psql -d <database-name> -f <path/to/filename>

Number and name of feature: Feature 1

Estimate of time needed to complete: 1:30

Start time: 9:20

Finish time: 10:50

Actual time needed to complete: _____





## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
-->