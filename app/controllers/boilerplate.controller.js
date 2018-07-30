const { handleSuccess, handleError } = require('../services/responseHandler'); 

const _successExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleSuccess( req, res, { id: `${exampleId}`, message: 'Success' } );
};

const _errorExample = ( req, res ) => {
  const exampleId = req.params.exampleId;

  handleError( req, res, { id: `${exampleId}`, message: 'Error' } );
};

module.exports = {
    successExample: _successExample
  , errorExample: _errorExample
};