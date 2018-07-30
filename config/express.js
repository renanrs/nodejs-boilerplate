const express     = require('express')
    , bodyParser  = require('body-parser')
    , consign     = require('consign')
    , morgan      = require('morgan')
    , Prometheus  = require('prom-client')
    , jwt         = require('jsonwebtoken')
    , collectDefaultMetrics = Prometheus.collectDefaultMetrics;

// Probe every 5th second.    
collectDefaultMetrics({ timeout: 5000 });

module.exports = () => {
  require('dotenv-safe').load({
    path: `${__dirname}/.${process.env.NODE_ENV}.env`,
    //path: `${__dirname}/config/.env`,
    sample: `${__dirname}/.env.example`,
    allowEmptyValues: false
  });

  const app = express();
  const sroot = process.cwd();
  const spublic = '/public/';

  app.use(express.static(sroot + spublic));

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( morgan('dev') );
  
  // Enables CORS
  app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', '86400');
    if ( req.method === 'OPTIONS' ) {
      res.header('Access-COntrol-Allow-Credentials', false);
    }
    next();
  });

  // Prometheus Monitoring default metrics generator
  app.get( '/metrics', ( req, res ) => {
    res.set('Content-Type', Prometheus.register.contentType );
    res.send( Prometheus.register.metrics() );
  });

  // Authorization header required, uses JSONWEBTOKEN.
  // If no Authorization header is provided, returns 401 - Unauthorized
  app.use( ( req, res, next ) => {
    if ( req.url === '/v1/auth' && req.method === 'POST' ) return next(); // it does not blocks authentication request
    if ( req.headers && req.headers.authorization ){
      jwt.verify( req.headers.authorization, process.env.JWT_SECRET, ( err, decode ) => {
        if ( err ) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      return res.status( 401 ).json( {message: 'Unauthorized'} );
    }
  });

  app.use( (req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
  });

  consign({ cwd: 'app'})
    .include('models')
    .then('controllers')
    .then('routes')
    .into( app );

  return app;
};