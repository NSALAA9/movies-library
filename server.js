'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3005;
const API_KEY = process.env.APIKEY;

function Movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}


app.get('/', (req, res) => {
  const myMovie = new Movie(
    "Spider-Man: No Way Home",
    "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
  );
  res.json(myMovie);
});


app.get('/favorite', (req, res) => {
  res.send('Welcome to Favorite Page');
});

/* */


function Item(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
function Person(name, gender, known_for_department, known_for) {
  this.name = name;
  this.gender = gender;
  this.known_for_department = known_for_department;
  this.known_for = known_for.map(item => {
      let title = item.title;
      return title;
  })
}


    function TopRatedMovie(id, title, vote_average, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.vote_average = vote_average;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

app.get('/trending', trendingMoviesHandler);
app.get('/search', searchMoviesHandler);
app.get('/top',topRatedhMoviesHandler);
app.get('/upcoming',upcominghMoviesHandler);
app.get('/people',popularPeopleHandler);

async function trendingMoviesHandler(req, res) {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(url);
    const mapResult = response.data.results.map(item => {
      
        let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
        return singleMovie;
    })
    res.send(mapResult);
    
    
  } catch (error) {
    console.log('Sorry, there was an error:', error);
    res.status(500).send(error);
  }
}

async function searchMoviesHandler(req, res) {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=The&page=2`;
  try {
    const response = await axios.get(url);
    const mapResult = response.data.results.map(item => {
      
      let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
      return singleMovie;
  })
  res.send(mapResult);
  
  } catch (error) {
    console.log('Sorry, there was an error:', error);
    res.status(500).send(error);
  }
}





function upcominghMoviesHandler(req, res) {

  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`

  try {
      axios.get(url)
          .then(result => {
              let mapResult = result.data.results.map(item => {
                  let singleMovie = new Item(item.id, item.title, item.release_date, item.poster_path, item.overview);
                  return singleMovie;
              })
              res.send(mapResult);

          })
          .catch((error) => {
              console.log('sorry you have something error', error);
              res.status(500).send(error);
          })

  }
  catch (error) {
      errorHandler(error, req, res)
  }
}

function popularPeopleHandler(req, res) {

  const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`

  try {
      axios.get(url)
          .then(result => {
              let mapResult = result.data.results.map(item => {
                  let singleperson = new Person(item.name, item.gender, item.known_for_department, item.known_for)
                  return singleperson;
              })
              res.send(mapResult);

          })
          .catch((error) => {
              console.log('sorry you have something error', error);
              res.status(500).send(error);
          })

  }
  catch (error) {
      errorHandler(error, req, res)
  }
}

function topRatedhMoviesHandler(req, res) {

  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`

  try {
      axios.get(url)
          .then(result => {
              let mapResult = result.data.results.map(item => {
                  let singleMovie = new TopRatedMovie(item.id, item.title, item.vote_average, item.release_date, item.poster_path, item.overview);
                  return singleMovie;
              })
              res.send(mapResult);

          })
          .catch((error) => {
              console.log('sorry you have something error', error);
              res.status(500).send(error);
          })

  }
  catch (error) {
      errorHandler(error, req, res)
  }
}

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    responseText: err.message || 'Sorry, something went wrong'
  });
});


app.use(cors());
app.listen(PORT, () => console.log(`Up and Runing on port ${PORT}`));

console.log("done");







