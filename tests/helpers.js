const supertest = require('supertest')
    , chai = require('chai')
    , app = require('../index')
    , jsonSchema = require("chai-json-schema");

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.jsonSchema = chai.use( jsonSchema );