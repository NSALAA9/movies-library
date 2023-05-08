'use strict';
const express = require('express');
const cors= require('cors');
const app = express();

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
app.listen(3003,() => console.log("Up and Runing on port 3003"));