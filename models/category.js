//const config = require("config");
//const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({

   

   name: {

    type: String,
    required: true,

   },

},
   {timestamps: true}
   );
  

module.exports = mongoose.model("Category", CategorySchema)
