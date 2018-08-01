const { handleSuccess, handleError } = require('../services/responseHandler'); 
const { exampleConnection } = require('../services/connections/exampleRequestProvider');

/**
 * @function successExample
 * @description Sends a successful response to the client. GET /v1/example/success/:ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _successExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleSuccess( req, res, { id: `${exampleId}`, message: 'Success' } );
};

/**
 * @function errorExample
 * @description Sends a error response to the client. GET /v1/example/error/:ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _errorExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleError( req, res, { id: `${exampleId}`, message: 'Error' } );
};

/**
 * @function externalExample
 * @description Sends a request to a external service passing the statusCode to the service. Depending on the statusCode provided it will return success or error.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _externalExample = ( req, res ) => {
  const options = {
    path: `/${req.params.statusCode}`,
    method: 'GET'
  };  

  exampleConnection( options )
    .then( successResponse => handleSuccess( req, res, { success: successResponse }, successResponse.statusCode ) )
    .catch( errorResponse  => handleError( req, res, { error: errorResponse }, errorResponse.statusCode ) );

};

module.exports = {
    successExample: _successExample
  , errorExample: _errorExample
  , externalExample: _externalExample
};