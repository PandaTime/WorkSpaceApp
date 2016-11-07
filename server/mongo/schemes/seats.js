var mongoose = require('mongoose');

module.exports = (function() {
    var seatsSchema = mongoose.Schema({
        data: [{
            id: String,
            name: String,
            x: Number,
            y: Number,
            radius: Number,
            floor: Number,
            fillStyle: String,
            assignedTo: {id: String, firstName: String, surName: String}
        }]
    });

    var collection = 'seats'; // DB collection name
    var seatsModel = mongoose.model('seats', seatsSchema, collection);
    seatsModel.find({}).exec(function (err, data){
        if (data.length == 0) {
            console.log("Initialization of the default seats..");
            initSeats(seatsModel);
        }
    });
})();

function initSeats(seatsModel){
    seatsModel.create({data: [{
        id: "xfx175wh1",
        name: 'WINNER',
        x: 557,
        y: 141,
        radius: 20,
        floor: 8,
        fillStyle: 'rgba(147, 197, 114, 0.8)',
        assignedTo: {id: "o7hxd78d7", firstName: "GOOD", surName: "BEST"}
    }]});
}