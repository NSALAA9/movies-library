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

/*const BASE_URL = 'https://api.themoviedb.org/3';

// Endpoint URLs
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;
 
// Additional endpoints
const CREDITS_URL = (movieId) => `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
const GENRES_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
 
// Example usage of endpoints
// Get trending movies
axios.get(TRENDING_URL)
  .then(response => {
    const movie = response.data.results[0];
    console.log({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview
    });
  })
  .catch(error => {
    console.error(error);
  });
 
// Search for a movie
axios.get(`${SEARCH_URL}Avengers`)
  .then(response => {
    const movie = response.data.results[0];
    console.log({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview
    });
  })
  .catch(error => {
    console.error(error);
  });
 
// Get credits for a movie
axios.get(CREDITS_URL(299534))
  .then(response => {
    console.log(response.data.cast);
  })
  .catch(error => {
    console.error(error);
  });
 
// Get genres for movies
axios.get(GENRES_URL)
  .then(response => {
    console.log(response.data.genres);
  })
  .catch(error => {
    console.error(error);
  });*/
  /*server.get('/trending', getTrendingMovies)
  server.get('/search', searchMovie)
  


const getTrendingMovies = async () => {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  try {
    const response = await axios.get(TRENDING_URL);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};


const searchMovie = async (query) => {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';
  const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
  try {
    const response = await axios.get(SEARCH_URL);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

// Example usage:
getTrendingMovies().then((movies) => {
  console.log('Trending movies:', movies);
});

searchMovie('The Dark Knight').then((movies) => {
  console.log('Search results:', movies);
});*/



function Item(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}

app.get('/trending', trendingMoviesHandler);
app.get('/search', searchMoviesHandler);

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

/*server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);*/





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










