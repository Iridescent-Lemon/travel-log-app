const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan'); //logs incoming http requests
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
const logs = require('./api/log');

//_______________________________________________________________________________
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(()=>{
	console.log('Connected to Database Successfully!')
})
.catch(err=>{
	console.log(err.message);
});
//_______________________________________________________________________________

app.use(express.json());
app.use(morgan('common')); //<-- you are going to see all the request coming
//this displays in sequence: IPv6 address -- [date/time created] "METHOD / PROTOCOL/version" statusCode mililseconds.

app.use(helmet());
app.use(cors({
	origin: process.env.CORS_ORIGIN // in the browser, only requests coming from this origin can reach this backend.
}));
//_______________________________________________________________________________

//root route
app.get('/',(req,res)=>{
	res.json({
		message: 'Bye World'
	});
});

app.use('/api/logs', logs); //<--import logs.js router and use it in '/api/logs'. 

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//_______________________________________________________________________________

app.listen(process.env.PORT || 8787, ()=>{
	console.log('Server is succesfully connected to PORT: 8080..');
});