const authController = require('../controllers/auth.controller')
    , { body } = require( 'express-validator/check' );

const _possibleErrorAuth = [
  body('email', 'email must exist and be alphanumeric').exists().isEmail(),
  body('pass', 'pass must exist and be alphanumeric').exists().isAlphanumeric()
];

const _possibleErrorRegister = [
  body('email', 'email must exist and be alphanumeric').exists().isEmail(),
  body('pass', 'pass must exist and be alphanumeric').exists().isAlphanumeric(),
  body('name', 'name must exist and be a String').exists().isString()
];

module.exports = ( app ) => {
  app.route('/v1/auth')
    .post( _possibleErrorAuth, authController.validateErrors, authController.userLogon )
    .delete( authController.logonRequired, authController.userLogout );

  app.route('/v1/register')
    .post( _possibleErrorRegister, authController.validateErrors, authController.userRegister );
};