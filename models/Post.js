//const config = require("config");
//const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    trim: true,
    unique:true
},
username: {
    type: String,
    required: true
},
tags:{
    type:Array,
    required: true
},
content: {
    type: String,
    required: true
},
date: {
 Date,
},
description: {
    type: String
},

reading_time: {
    type: Number,
},
readCount: {

    type: Number,

    default:0
},

readingTime: {
    type: Number,
    tags:[String]
},

state: {

    type: String,
    default: 'draft', enum: ['draft', 'published']
},


},
{timestamps:true},

);


module.exports= new mongoose.model ('Post', PostSchema);














