const authController = require('../controllers/auth.controller')
    , exampleController = require('../controllers/example.controller');

module.exports = ( app ) => {
  app.route('/v1/example/success/:exampleId')
    .get( authController.logonRequired, exampleController.successExample );
  
  app.route('/v1/example/error/:exampleId')
    .get( authController.logonRequired, exampleController.errorExample );

  app.route('/v1/example/external/:statusCode')
    .get( authController.logonRequired, exampleController.externalExample );
  
};