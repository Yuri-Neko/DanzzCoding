require('./set')
__path = process.cwd()

/*
* Created by: Danzz Coding | https://danzzcodingweb.vercel.app
*/

// Module
var express = require('express'); 
var app = express();
var createError = require('http-errors');
var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');

//
cors = require('cors'),
secure = require('ssl-express-www');

// Port
var PORT = process.env.PORT || 8989 || 5000 || 3000

// Image title
app.use(favicon(path.join(__dirname,'assets','src','images','favicon.ico')))

// Routes
var main = require('./routes/main'),
    api = require('./routes/api')

// App use
app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("assets"))
app.use('/', main)
app.use('/api', api)

// App use error 404
app.use(function (req, res, next) {
	next(createError(404))
	})
	
app.use(function (err, req, res, next) {
	res.sendFile(__path + '/views/error.html')
	})
  
// App listen (port)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:` + PORT)
	console.log(`Hii ${creator}`)
	})

// 
module.exports = app