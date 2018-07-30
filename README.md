# NodeJS Microservice Boilerplate

NodeJS Microservice boilerplate application that uses the packages below:

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

For testing, this project uses:
* [Mocha][mocha] (Test Runner)
* [MochAwesome][mochawesome] (Test Reporter)
* [Chai][chai] (Assertion)
* [Supertest][supertest] (Service Runner)


## ENV Variables
Specify an env variable skeleton at `config/.env.example` and create a file at `config/.{NODE_ENV}.env` with the variables real values. If you create a variable on `config/.{NODE_ENV}.env` without specifying it on `config/.env.example`, the application will not start.

## Running the application
### Production:
```bash
  # PWD=project root folder
  $ npm run start
```
### Development:
```bash
  # PWD=project root folder
  $ npm run dev
```

## Folder structure
All of the application logic is inside `app` folder. Inside this folder it has a few other folders:

* [routes/](#routes)
* [controllers/](#controllers)
* [models/](#models)
* [services/](#services)

### Routes
This folder contains all routing files that will be exposed by the application. Each route and HTTP Method should be especified inside the file.

The recommendation is to use `ROUTE RELATED FUNCTIONS.router.js`, just like `auth.router.js` has all AUTH related routes.

### Controllers 
This folder contains all controllers files that will be imported inside [`routes/`](#routes) files, and should have the functions that the route will execute.

The recommendation is to use `ROUTE NAME.controller.js`, just like `auth.controller.js` has all AUTH related functions and it's easier to maintain due to the same name of the router.

### Models
This folder contains all MongoDB Schemas that will be used inside [`controllers/`](#controllers) files.

There recommendation is to use `COLLECTION NAME.js`. Keep in mind that this model will create a collection inside your MongoDB with the exact same name defined inside the file. (EG: [User](./app/models/User.js):21)

### Services
This folder contains all services provider for the application. When needed, require it inside the controller and use it's functions.

In this example, it has a `responseHandler` that will return the response provided to the client, and also a sub-folder called `connections` that handles all external connections using [Request-Promise][request-promise].

The recommendation is to organize it the way you make the most confortable and organized as you wish.

# Deployment
This boilerplate is ready for deployment inside [IBM Cloud][IBM Cloud].

The only modification needed is changing the `manifest.yml` application name to the name of your desire.

```bash
  $ cf login #--sso recommended

  # provide your credentials
  # ...
  $ cf push # Creates a new application inside IBM Cloud if doesn't exist

```

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