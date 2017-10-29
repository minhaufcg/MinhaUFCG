var mongoose = require('mongoose');
var bdURI = 'mongodb://localhost/minhaufcg';

mongoose.connect(bdURI, {useMongoClient: true});

// Listen for Mongoose connection events and output statuses to console
mongoose.connection.on('connected', function () {
    'use strict';
    console.log('Mongoose connected to ' + bdURI);
});

mongoose.connection.on('error', function (err) {
    'use strict';
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    'use strict';
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    'use strict';
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// Listen for SIGUSR2, which is what nodemon uses
process.once('SIGURS2', function () {
    'use strict';
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGURS2');
    });
});

//Listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
    'use strict';
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function () {
    'use strict';
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});
