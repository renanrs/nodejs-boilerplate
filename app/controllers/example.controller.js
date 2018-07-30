const { handleSuccess, handleError } = require('../services/responseHandler'); 
const { exampleConnection } = require('../services/connections/exampleRequestProvider');

const _successExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleSuccess( req, res, { id: `${exampleId}`, message: 'Success' } );
};

const _errorExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleError( req, res, { id: `${exampleId}`, message: 'Error' } );
};

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