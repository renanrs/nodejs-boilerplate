const requestPromise = require( 'request-promise' ); 

const _exampleConnection = ( options ) => {
  
  return new Promise( ( resolve, reject ) => {
    options.timeout = 5000; // Timeout in MS
    options.url = process.env.EXAMPLE_URL + options.path;
    options.json = true;
    
    requestPromise( options )
      .then( parsedBody => resolve( parsedBody ) )
      .catch( err => reject( err.error ) );
  });
};

module.exports = {
  exampleConnection: _exampleConnection
};