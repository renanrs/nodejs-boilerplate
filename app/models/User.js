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

//               THIS will be your collection name
mongoose.model( 'User', userSchema );