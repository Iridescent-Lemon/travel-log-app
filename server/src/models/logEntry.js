const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const positionDefine = {
		type: Number,
		required: true
	};

const travelLogSchema = new Schema({
	title: {
		type: String,
		required: [true, "Please Indicate Title.."]
	},
	image: String,
	description: String,
	comments: {
		type: String
	},
	rating: {
		type: Number,
		min: 0,
		max: 10,
		default: 0
	},
	visitedDate: {
		type: Date,
		required: true
	},
	latitude: {
		...positionDefine,
		min: -90,
		max: 90
	},
	longitude: {
		...positionDefine,
		min: -180,
		max: 180
	}, 
},
	{
	timestamps: true
	}
);

const TravelLog = new model('TravelLog', travelLogSchema);

module.exports = TravelLog;


