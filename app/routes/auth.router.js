const authController = require('../controllers/auth.controller')
    , { body } = require( 'express-validator/check' );

const _possibleError = [
  body('email', 'email must exist and be alphanumeric').exists().isEmail()
];

module.exports = ( app ) => {
  app.route('/v1/auth')
    .post( _possibleError, authController.validateErrors, authController.userLogon )
    .delete( authController.logonRequired, authController.userLogout );

  app.route('/v1/register')
    .post( _possibleError, authController.validateErrors, authController.userRegister );
};