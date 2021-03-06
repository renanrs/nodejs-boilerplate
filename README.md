![NodeJS][nodejs]

# NodeJS Microservice Boilerplate

This boilerplate was created to help a very simple problem of beggining to learn NodeJs: on every video/tutorial that the student watches, it have a different directory structure making it harder to understand NodeJS as a whole. So, I decided to help them by making a simple yet powerful boilerplate that is very easy to customize with new dependencies that fit your needs.

It also includes an Authentication route, and 3 example routes, 1 for success, 1 for error and 1 that sends a request to a external service and depending on the answer, sends success or error to the client.

NodeJS Microservice boilerplate application that uses the packages below.

* [Express][express] (Router)
* [Mongoose][mongoose] (DBC)
* [BCrypt][bcrypt] (Cryptography)
* [BodyParser][body-parser] (Body parsing)
* [Consign][consign] (Module loader)
* [Consul][consul] (Service Discovery)
* [DotEnv-Safe][dotenv-safe] (Env variables loader)
* [JsonWebToken][jsonwebtoken] (OAuth JSON Web Token)
* [Morgan][morgan] (Request logger)
* [Pm2][pm2] (Process Manager)
* [Prometheus Client][prom-client] (Prometheus Client)
* [Request][request] (Request for other services)
* [Request-Promise][request-promise] (Request for other services)
* [JSDoc][jsdoc] (Documentation)

For testing, this project uses:
* [Mocha][mocha] (Test Runner)
* [MochAwesome][mochawesome] (Test Reporter)
* [Chai][chai] (Assertion)
* [Supertest][supertest] (Service Runner)


## ENV Variables
Specify an env variable skeleton at `config/.env.example` and create a file at `config/.env` with the variables real values. If you create a variable on `config/.env.example` without specifying it on `config/.env`, the application will not start.

## Running the application
### Production:
```bash
  # PWD=project root directory
  $ npm run start
```
### Development:
```bash
  # PWD=project root directory
  $ npm run dev
```

## Directory structure
All of the application logic is inside `app` directory. Inside this directory it has a few other directories:

* [routes/](#routes)
* [controllers/](#controllers)
* [models/](#models)
* [services/](#services)

### Routes
This directory contains all routing files that will be exposed by the application. Each route and HTTP Method should be especified inside the file.

The recommendation is to use `ROUTE RELATED FUNCTIONS.router.js`, just like `auth.router.js` has all AUTH related routes.

### Controllers 
This directory contains all controllers files that will be imported inside [`routes/`](#routes) files, and should have the functions that the route will execute.

The recommendation is to use `ROUTE NAME.controller.js`, just like `auth.controller.js` has all AUTH related functions and it's easier to maintain due to the same name of the router.

### Models
This directory contains all MongoDB Schemas that will be used inside [`controllers/`](#controllers) files.

There recommendation is to use `COLLECTION NAME.js`. Keep in mind that this model will create a collection inside your MongoDB with the plural of the name defined inside the file. (EG: [User](./app/models/User.js):21 has created a collection called Users)

### Services
This directory contains all services provider for the application. When needed, require it inside the controller and use it's functions.

In this example, it has a `responseHandler` that will return the response provided to the client, and also a sub-directory called `connections` that handles all external connections using [Request-Promise][request-promise].

The recommendation is to organize it the way you make the most confortable and organized as you wish.

# Testing the app
To test the application run
```bash
  $ npm run test
```

The test scripts are written inside the directory `tests/coverage`. When you run the test script, the directory `public/` will be created, it has an `index.html` file inside. 

To open the `index.html`, start your server using
```bash
  $ npm run dev
```
and access `http://localhost:<PORT>/tests`, you should see the report generated by [mochawesome][mochawesome].

# Documentation
To generate the app [JSDoc][jsdoc], run
```bash
  $ npm run doc
```

The JSDoc will be generated inside `public/jsdoc` directory. To view the documentation, access `http://localhost<PORT>/jsdoc`, you should see the JSDoc generated by [JSDoc][jsdoc]

# Deployment
This boilerplate is ready for deployment inside [IBM Cloud][IBM Cloud].

The only modification needed is changing the `manifest.yml` application name to the name of your desire.

```bash
  $ cf login #--sso recommended

  # provide your credentials
  # ...
  $ cf push # Creates a new application inside IBM Cloud if doesn't exist

```

## License
[MIT](LICENSE)

[express]: https://github.com/expressjs/
[mongoose]: https://github.com/Automattic/mongoose
[mocha]: https://github.com/mochajs/mocha
[mochawesome]: https://github.com/adamgruber/mochawesome
[supertest]: https://github.com/visionmedia/supertest
[chai]: https://github.com/chaijs/chai
[bcrypt]: https://github.com/kelektiv/node.bcrypt.js
[body-parser]: https://github.com/expressjs/body-parser
[consign]: https://github.com/jarradseers/consign
[consul]: https://github.com/silas/node-consul
[dotenv-safe]: https://github.com/rolodato/dotenv-safe
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[morgan]: https://github.com/expressjs/morgan
[pm2]: https://github.com/Unitech/pm2
[prom-client]: https://github.com/siimon/prom-client
[request]: https://github.com/request/request
[request-promise]: https://github.com/request/request-promise
[IBM Cloud]: https://console.bluemix.net/
[jsdoc]: https://github.com/jsdoc3/jsdoc
[nodejs]: https://nodejs.org/static/images/logo-hexagon-card.png