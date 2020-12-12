//this NOT FOUND middleware should be at the most bottom on index.js
//if any of the routes they requested is not found this is specifically for that.
const notFound = (req,res,next)=>{
	//this req.originalUrl is just the url they entered in the browser.
	const error = new Error(`Not Found -- ${req.originalUrl}`);
	//set status code
	res.status(404);
	//Forward things to next actual Error handling middleware(express);
	next(error);
};

//General Error Middleware Handler, has 4 parameters
//handles any type of error that can happen
/*eslint-disable-next-line no-unused-vars*/
const errorHandler = (error, req, res, next)=>{
	const statusCode = res.statusCode === 200? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production'? '🦆' : error.stack //<-- error tracer, find where the error was
	});
};

module.exports = {
	notFound,
	errorHandler
};