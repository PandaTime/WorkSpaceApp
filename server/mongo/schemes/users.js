var mongoose = require('mongoose');

module.exports = (function() {
    var usersSchema = mongoose.Schema({
        data: [{
            id: String,
            firstName: String,
            surName: String,
            seat: {id: String, name: String}
        }]
    });

    var collection = 'seatUsers'; // DB collection name
    var usersModel = mongoose.model('seatUsers', usersSchema, collection);
    usersModel.find({}).exec(function (err, data){
        if (data.length == 0) {
            console.log("Initialization of the default users..");
            initSeats(usersModel);
        }
    });
})();

function initSeats(usersModel){
    usersModel.create({data: [{
        id: "o7hxd78d7",
        firstName: "GOOD",
        surName: "BEST",
        seat: {id: "xfx175wh1", name: "WINNER"}
    }]});
}