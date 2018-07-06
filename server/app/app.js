const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const institutesRoutes = require('./routes/v1/institute');
/**
 * Database connection
 */
 mongoose.connect(`mongodb://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0-shard-00-00-fkk6w.mongodb.net:27017,cluster0-shard-00-01-fkk6w.mongodb.net:27017,cluster0-shard-00-02-fkk6w.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=false`);
/**
 * Middlewares
 */
app.use(morgan('dev'));
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
/**
 * Routes
 */
app.use('/api/v1/institutes', institutesRoutes);
/**
 * Errors
 */
app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;