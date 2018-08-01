const mongoose = require('mongoose');

const user = {
  name: {
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

//               THIS will be your collection name, in this case: users
mongoose.model( 'User', userSchema );