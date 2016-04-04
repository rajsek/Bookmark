var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();



// Get Leads
var GetBookmark = require('./models/GetBookmark')(mongoose);
//routes.use(GetBookmark);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session({
//    secret: "Case Study Secret key"
//    , store: new MemoryStore()
//}));
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/myappdatabase'

mongoose.connect(mongoUri);


//app.use('/', routes);
app.get('/', function (req, res) {
    console.log('From Submited');
    var resultenLeads = GetBookmark.returnList(res);

});
app.post('/remove/', function (req, res) {
    console.log('From Submited');

    var id = req.param('id', null);
    var childid = req.param('childid', null);

    var resultenLeads = GetBookmark.removeList(res, id, childid);
    console.log('Leads sent');

});
app.post('/update/', function (req, res) {
    console.log('From Submited');

    var id = req.param('id', null);
    var childid = req.param('childid', null);
    var name = req.param('website_name', null);
    var site = req.param('website_addr', null);
    var resultenLeads = GetBookmark.updateList(res, id, childid, name, site);

    //res.json(resultenLeads);
    //var resultenLeads = GetLeads.returnLeads(branchid, Lead, Action, res);



    console.log('Leads sent');

    //console.log('login was successful');
});
app.get('/bookmarks', function (req, res) {
    console.log('From Submited');
    var resultenLeads = GetBookmark.returnList(res);
    res.json(resultenLeads);
    console.log('Leads sent');

});

app.post('/addList/', function (req, res) {
    console.log('triggered DB Submited');
    var type = req.param('content_type', null);
    var name = req.param('website_name', null);
    var site = req.param('website_addr', null);

    var resultenLeads = GetBookmark.addList(res, type, name, site);
    console.log('Leads sent');

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message
            , error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message
        , error: {}
    });
});


module.exports = app;