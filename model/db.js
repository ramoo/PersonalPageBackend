var mongoose = require('mongoose');

var options = {
  useMongoClient: true
};

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + process.env.DATABASE_CONNECTION_STRING);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected')
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, options);

module.exports = mongoose;