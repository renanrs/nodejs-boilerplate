const { validationResult } = require('express-validator/check')
    , mongoose  = require('mongoose')
    , jwt       = require('jsonwebtoken')
    , bcrypt    = require('bcrypt')
    , User      = mongoose.model('User')
    , { handleSuccess, handleError } = require('../services/responseHandler');

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

const _userLogout = ( req, res ) => {
  res.status( 200 ).json( { message: 'Success' } );
};

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

const _validateErrors = ( req, res, next ) => {
  const errors = validationResult( req );
  if ( !errors.isEmpty() ) {
    return res.status( 400 ).json( {errors: errors.mapped() } );
  };

  next();
};

const _logonRequired = ( req, res, next ) => {
  const token = req.headers.authorization;

  token ?
    jwt.verify( token, process.env.JWT_SECRET, ( err, decode ) => {
      if ( err ) return res.status( 401 ).send({message: 'Invalid token'});
      req.user = decode;
      next();
    })
  : res.status( 401 ).send({
      message: 'Invalid token'
    });
};

module.exports = {
    logonRequired: _logonRequired
  , validateErrors: _validateErrors
  , userLogon: _userLogon
  , userRegister: _userRegister
  , userLogout: _userLogout
};
