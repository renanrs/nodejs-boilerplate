const mongoose = require('mongoose');

const user = {
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
};

const userSchema = mongoose.Schema( user );

mongoose.model( 'User', userSchema );