# Hackerbay backend assignment 
[![Build Status](https://travis-ci.org/joelethan/hackerbay-app-backend.svg?branch=master)](https://travis-ci.org/joelethan/hackerbay-app-backend)

A simple stateless microservice built in Nodejs, with three major functionalities,
- Authentication
- JSON patching
- Image Thumbnail Generation

## Installation
- Install [Node js](https://nodejs.org)
- Clone to the repository: `https://github.com/joelethan/hackerbay-app-backend`
- Change directory into the root of the project: `cd hackerbay-app-backend`
- Install project dependencies: Run `npm install`
- Start the application: `npm start`

## Endpoints worked on
- User can signin to the microservice using arbitrary credentials
    - request headers: `Content-Type: application/json`
    - request body:
    ```
    {
	"email":"johndoe@gmail.com",
	"password":"password"
    }
    ```
- User can apply json patch to a json object and perform CRUD operations
    - request headers: 
    ```
    Content-Type: application/json
    Authorization: user-token
    ```
    - request body:
    ```
    {
        "myobj":{
            "baz": "qux",
            "foo": "bar"
            },
        "patch": [
            { "op": "replace", "path": "/baz", "value": "boo" },
            { "op": "add", "path": "/hello", "value": ["world"] },
            { "op": "remove", "path": "/foo" }
            ]
    }
    ```
    - response body:
    ```
    {
        "patch": {
            "baz": "boo",
            "hello": ["world"]
        }
    }
    ```
- User can download an Image and create it's Thumbnail from the Image's URL
    - request headers: 
    ```
    Content-Type: application/json
    Authorization: user-token
    ```
    - request body:
    ```
    {
        "url": "imageurl",
        "imageName": "imagename"
    }
    ```
## Testing

To run the tests and view test coverage of the App
- Run: `npm test`
### NB:
To run the tests, Ensure your laptop has an active internet connection

## Author
Katusiime Joel Ian
