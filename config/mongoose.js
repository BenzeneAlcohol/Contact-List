const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!");
});
