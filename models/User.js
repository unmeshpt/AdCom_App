const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
  googleId: {
    type: String,
    required: true,
    default: "localuser"
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default:"CLIENT"
  }, 
  designation: {
    type: String,
    default:"User"
  },
  password: {
    type: String,
  }, 
  image: {
    type: String,
  },
},
{ timestamps: true });


module.exports = mongoose.model('User', UserSchema)
