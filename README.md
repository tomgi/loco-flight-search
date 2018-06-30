# Loco Flight Search

Simple flight search application that uses Locomote API.

Deployed to https://loco-flight-search.herokuapp.com/ (using free dyno, initial load can take some time if dyno went idle after inactivity).

## Getting Started

Install dependencies, precompile assets and run server in `production` environment with:
```
$ ./start.sh
```

Or if you prefer to do it manually step-by-step:
```
$ npm install
$ npm run build
$ NODE_ENV=production npm start
```

### Prerequisites

To run this project you're gonna need
* Node >= 7.6.0 (for native async/await support). \
I strongly recommend using [nvm](https://github.com/creationix/nvm) for installing and managing Node versions.
* NPM >= 5.0.0
* Browser with ES6 support.

### Developing

Use
```
$ npm run dev
```
to have a live reload of both backend and frontend.

In this mode JS sourcemaps are also included which enables in-browser debugging of frontend scripts.


## Running the tests

### Backend

Run with:
```
$ npm test
```

Backend tests use [Jest](https://facebook.github.io/jest/), [SuperTest](https://github.com/visionmedia/supertest) and [nock](https://github.com/nock/nock).

### Acceptance

Run with:
```
$ npm run test-acceptance
```

Decided to give [cypress](https://www.cypress.io/) a try for end-to-end browser testing.

## Deployment

Application is deployed to Heroku https://loco-flight-search.herokuapp.com/

## Built With

Backend uses [koa](https://koajs.com/) web framework.

Frontend is pretty much VanillaJS, just some common libraries like [jQuery](https://jquery.com/) or [Moment.js](https://momentjs.com/) + [handlebars](https://handlebarsjs.com/) templates for a bit nicer componentization.

[webpack](https://webpack.js.org/) is used to bundle all frontend JS to a single file. \
[babel](https://babeljs.io/) with `es2016` + `es2017` presets is used to be able to use async/await in the frontend code.

## License

This project is licensed under the MIT License.
