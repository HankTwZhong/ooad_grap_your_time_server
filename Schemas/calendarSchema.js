var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var calendarSchema = new Schema({
    account: {
        type: String,
        require : true
    },
    typeList: [{
        typeName: {
            type: String
        },
        eventList:[{
            title:{
                type: String
            },
            start: {
                type: Date,
                require:true
            },
            end: {
                type: Date,
                require:true
            },
            desc: {
                type: String
            }
        }]
    }]
});


module.exports = mongoose.model('calendar', calendarSchema);