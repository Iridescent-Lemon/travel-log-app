const { Router } = require('express');

const TravelLog = require('../models/logEntry');

//Router() make these routes exportable
const router = Router();

//READ
router.get('/', async (req,res, next)=>{
	try{
	const results =	await TravelLog.find();
	//this will give us back an array of documents
	res.json(results);
	}catch(error){
	 next(error);	
	}

});

//CREATE
router.post('/', async (req, res, next)=>{
	try{
	const travelLog1 = new TravelLog(req.body);
	const createdEntry = await travelLog1.save();
	res.json(createdEntry);
	}catch(error){
		console.log(error.name);
	 	if(error.name === 'ValidationError'){
		 res.status(422);
		}
		next(error);
	}
});


module.exports = router;