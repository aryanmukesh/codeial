const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "** IN CONNECTING TO MongoDB**"));

db.once('open', function(){
    console.log("**CONNECTED TO MongoDB DATABASE**");
});

module.exports = db;