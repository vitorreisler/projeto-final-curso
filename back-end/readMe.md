# To check all the examples request
https://documenter.getpostman.com/view/28260577/2sA2r3aRhU#e582c282-4c8e-433b-bc7d-f7f976b69f43

# Description
This is the backend of a web application, developed in Node.js using the Express framework. It provides endpoints to manage users and products, as well as implementing JWT (JSON Web Token) authentication and request rate limiting.

# File Structure
The file structure of the application is as follows:

## App.js: 
The entry point of the application, where the Express server is configured and connected to the MongoDB database.

## Middlewares:

### auth.mw.js: 
Middleware responsible for authenticating requests using JWT.

### rateLimiter.js: 
Middleware for limiting the request rate.

# Models:
### user.model.js: 
Defines the schema and related methods for the user model.

### product.model.js: 
Defines the schema for the product model.
# Routes:

### users.routes.js: 
Contains routes related to users, including registration, login, search, and editing.

### products.routes.js: 
Routes for product manipulation, including category search, ID search, listing, and CRUD operations.

# Package.json: 
Node.js manifest file that includes dependencies and scripts for running the application.


# Main Dependencies
## Express: 
Web framework for Node.js.
## Mongoose: 
Object Data Modeling library for MongoDB.
## jsonwebtoken: 
Implementation of JSON Web Tokens for authentication.
## bcrypt: 
Library for password hashing.
## express-rate-limit: 
Middleware for limiting HTTP request rates.

# Scripts
The package.json file includes the following scripts:

## start: 
Starts the server.
## dev: 
Starts the server in development mode with Nodemon.

# Environment Configuration
The application uses environment variables for configurations such as the MongoDB database URI and the secret key for JWT token generation. To configure the environment, create a .env file in the project root and define the necessary variables.

### README.md: 
Application documentation.
