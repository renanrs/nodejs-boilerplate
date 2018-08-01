const addContext = require('mochawesome/addContext');

describe( 'Auth Tests', () => {
  describe( 'POST /v1/auth', () => {
    it('should authenticate on the APP and retrieve a token.', function( done ) {
      const bodyToSend = {
        email: process.env.TEST_EMAIL, // You can set a hard-coded value here. Your call.
        pass: process.env.TEST_PASS // You can set a hard-coded value here. Your call.
      };

      addContext( this, {
        title: 'Request Method',
        value: 'POST'
      });

      addContext( this, {
        title: 'Request Path',
        value: '/v1/auth'
      });

      addContext( this, {
        title: 'Request Body',
        value: bodyToSend
      });

      request
        .post( '/v1/auth' )
        .send( bodyToSend )
        .set('Content-Type', 'application/json')
        .end( (err, res) => {
          expect( res.statusCode ).to.be.eql( 200 );

          addContext( this, {
            title: 'Response retrieved from service',
            value: err || res
          });

          done( err );
        });
    }).timeout( 3000 );
  });
});