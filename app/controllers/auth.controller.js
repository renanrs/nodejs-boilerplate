const { validationResult } = require('express-validator/check')
    , mongoose  = require('mongoose')
    , jwt       = require('jsonwebtoken')
    , bcrypt    = require('bcrypt')
    , User      = mongoose.model('User')
    , { handleSuccess, handleError } = require('../services/responseHandler');

/**
 * @function userLogon
 * @description Logon the user onto the microservice. To logon, send a JSON with 'email' and 'password' to POST /v1/auth
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _userLogon = ( req, res ) => {
  User.findOne({email: req.body.email})
    .then( user => {
      if ( !user ) return handleError( req, res, {message:'Authentication failed. User not found.'}, 401 );

      bcrypt.compare(req.body.pass, user.pass)
        .then( result => {
          if (!result) return handleError( req, res, { message:'Authentication failed. Invalid Password.' }, 401 );
          
          const token = jwt.sign( { email: user.email }, process.env.JWT_SECRET, { expiresIn: 86400 } ); // Token expires in 24 hours
          return handleSuccess( req, res, { token: token }, 200 );
        })
        .catch( err => handleError( req, res, err, 500 ) ); 
    })
    .catch( err => handleError( req, res, err, 500 ) ); 
};

/**
 * @function userLogout
 * @description Logoff the user of the microservice. To logoff, send a Authorization token header to DELETE /v1/auth
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _userLogout = ( req, res ) => {
  res.status( 200 ).json( { message: 'Success' } );
};

/**
 * @function userRegister
 * @description Creates a new user on the database. To register, send a JSON with the structure defined at ../models/User.js to POST /v1/register
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const _userRegister = ( req, res ) => {
  User.findOne({email: req.body.email})
    .then( user => {
      if ( user ) return handleError( req, res, {message: 'User already exists'}, 400 );
      
      bcrypt.hash( req.body.pass, 10 )
        .then( hash  => {
          const newUser = new User( req.body );
          newUser.pass = hash;
          newUser.save()
            .then( user => {
              user.pass = undefined;
              return res.json( user );
            })
            .catch( err => handleError( req, res, err, 500 ) );
        })
        .catch( err => handleError( req, res, err, 500 ) );
    })
    .catch( err => handleError( req, res, err, 500 ) ); 
};

/**
 * @function validateErrors
 * @description Validate erros on the request according to the possible errors defined on the route file.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const _validateErrors = ( req, res, next ) => {
  const errors = validationResult( req );
  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( {errors: errors.mapped() } );
  };

  next();
};

/**
 * @function validateErrors
 * @description Verify if the Authorization token received on header is signed to any user, if succeeds grants access to the user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const _logonRequired = ( req, res, next ) => {
  const token = req.headers.authorization;

  token ?
    jwt.verify( token, process.env.JWT_SECRET )
      .then( decode => {
        req.user = decode;
        next();
      })
      .catch( err => handleError( req, res, {message: 'Invalid token'}, 401 ) )
  : handleError( req, res, {message: 'Invalid token'}, 401 );
};

module.exports = {
    logonRequired: _logonRequired
  , validateErrors: _validateErrors
  , userLogon: _userLogon
  , userRegister: _userRegister
  , userLogout: _userLogout
};
