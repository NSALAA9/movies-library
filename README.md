# movies-library
 
 ## the web request response cycle for the task 

1. A client (such as a web browser) sends a request to the server.
2. The request contains information such as the HTTP method (e.g. GET, POST), the URL, and any data being sent in the request body.
3. The server receives the request and processes it.
4. The server uses the Express package to handle the request and to route it to the appropriate endpoint.
5. The server sends a response back to the client.
6. The response contains information such as the HTTP status code (e.g. 200 OK, 404 Not Found), any data being sent in the response body, and any headers that need to be sent.
7. The client receives the response and can then display the data to the user or perform further actions based on the response.


# Project Name - Project Version

**Author Name**: Ala'a Nsairat

## WRRC


## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm start` to start the server.
5. Visit `http://localhost:3003` in your web browser to view the home page.

## Project Features
<!-- What are the features included in you app -->
- Home Page Endpoint: `/`
- Favorite Page Endpoint: `/favorite`
- Error Handling Middleware: Handles server errors (status 500) and "page not found" errors (status 404)
