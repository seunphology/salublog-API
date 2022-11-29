//const config = require("config");
//const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique:true,
    lowercase: true,
    
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    
  
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },

},


   { timestamps: true} 
);


module.exports = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}


exports.validate = validateUser;
