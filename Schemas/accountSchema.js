var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var accountSchema = new Schema({
    account:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})


module.exports = mongoose.model('event', accountSchema);