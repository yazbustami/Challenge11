// set up express
// do all the config 
// define  api routes
// define html routes
// turn on server (listener)

const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const Notes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

