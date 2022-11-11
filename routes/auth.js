const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/User');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/register', async (req,res)=> {
  // const confirm = await User.find({Username : req.body.username ,email : req.body.email})
   //confirm && res.status(400).json('this user or email exist');
   try {
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.password, salt);

const newUser = await new User({
       username: req.body.username,
       email: req.body.email,
       password: hashedPass,     

})
    const user = await newUser.save();
    res.status(200).json(user);
 } catch (error) {
    res.status(500).json(error); 
 }
})

// Login
router.post('/login', async (req, res) => {
  //const { error } = validate(req.body); 
  //if (error) return res.status(400).send(error.details[0].message);
try {
  const user = await User.findOne({ email: req.body.email });
   (!user) && res.status(400).json('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
   (!validPassword) && res.status(400).json('Invalid email or password.');

  //const token = user.generateAuthToken();
  //res.send(token);

  const {password,...others} = user._doc
  res.status(200).json(others);
} catch (error) {
  res.status(500).json(error)
}
});

/*function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}*/

module.exports = router; 
