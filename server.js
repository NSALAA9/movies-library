'use strict';
const express = require('express');
const cors = require('cors');
//const data = require('./Movie_Data/data.json');
const app = express();
const axios = require('axios');
require('dotenv').config();
const pg=require ('pg');
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3005;
const API_KEY = process.env.APIKEY;
const client= new pg.Client(process.env.DBURL);




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


//lab 13 construtors
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

//lab 14
app.get('/trending', trendingMoviesHandler);
app.get('/search', searchMoviesHandler);
app.get('/top',topRatedhMoviesHandler);
app.get('/upcoming',upcominghMoviesHandler);
app.get('/people',popularPeopleHandler);

//lab 15

app.get('/getMovies', getMoviesHandler)
app.post('/addMovies', addMovieHandler)


//lab16
app.put('/getMovies/:id', updateMoviesHandler)
app.delete('/getMovies/:id', deleteMoviesHandler)
app.get('/getMoviesById', geteMoviesByIdHandler)


//lab 14
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

//lab 15

function getMoviesHandler(req, res) {
  const sql = `SELECT * from movie`;
  client.query(sql)
      .then(data => {
          res.send(data.rows);//.rows in order to git just the records
      })

      .catch((error) => {
          errorHandler(error, req, res)
      })
}

function addMovieHandler(req, res) {
  const movie = req.body;
  console.log(movie);
  const sql = `INSERT INTO movie (title, release_date, poster_path, overview)
  VALUES ($1, $2, $3, $4);`
  const values = [movie.title, movie.release_date, movie.poster_path, movie.overview];
  client.query(sql, values)
      .then(data => {
          res.send("The movie has been added successfully");
      })
      .catch((error) => {
          errorHandler(error, req, res)
      })
}


/*
app.post('/addMovie', async (req, res) => {
  try {
    const { title, year, comments } = req.body;

    // Insert the new movie data into the database
    const query = 'INSERT INTO movies (title, year, comments) VALUES ($1, $2, $3)';
    await pool.query(query, [title, year, comments]);

    res.status(201).send('Movie added successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});

// Define a route for retrieving all movies
app.get('/getMovies', async (req, res) => {
  try {
    // Retrieve all movies from the database
    const query = 'SELECT * FROM movies';
    const { rows } = await pool.query(query);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});*/



//lab 16

function updateMoviesHandler(req, res) {
  const { id } = req.params;
  console.log(req.body);
  const sql = `UPDATE movie
  SET title = $1, release_date = $2, poster_path = $3, overview = $4
  WHERE id = ${id};`
  const { title, release_date, poster_path, overview } = req.body;
  const values = [title, release_date, poster_path, overview];
  client.query(sql, values).then((data) => {
      res.send(data)
  })
      .catch((error) => {
          errorHandler(error, req, res)
      })
}

function deleteMoviesHandler(req, res) {
  const id = req.params.id;
  console.log(req.params);
  const sql = `DELETE FROM movie WHERE id=${id};`
  client.query(sql)
      .then((data) => {
          res.status(202).send(data)
      })
      .catch((error) => {
          errorHandler(error, req, res)
      })
}

function geteMoviesByIdHandler(req, res) {
  let id = req.query.id;
  console.log(req.query);
  const sql = `SELECT * FROM movie WHERE id = ${id};`
  client.query(sql)
      .then((data) => {
          res.send(data.rows)
      })
      .catch((error) => {
          errorHandler(error, req, res)
      })
}

//lab 13
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





  //app.listen(PORT, () => console.log(`Up and Runing on port ${PORT}`));

  client.connect()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Up and Runing on port ${PORT}`)
      })
  })









