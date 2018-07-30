const authController = require('../controllers/auth.controller')
    , boilerPlateController = require('../controllers/boilerplate.controller')
    , { body } = require( 'express-validator/check' );

const _possibleError = [
  body('email', 'email must exist and be alphanumeric').exists().isEmail()
];

module.exports = ( app ) => {
  app.route('/v1/example/:exampleId')
    .get( authController.logonRequired, boilerPlateController.example );
};