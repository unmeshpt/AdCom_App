const mongoose = require('mongoose')

const LocalUserSchema = new mongoose.Schema( {

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
    required:true,
  },
  email: {
    type: String,
    required:true,
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
    required:true,
  }, 
  image: {
    type: String,
  },
},
{ timestamps: true });


module.exports = mongoose.model('LocalUser', LocalUserSchema)
