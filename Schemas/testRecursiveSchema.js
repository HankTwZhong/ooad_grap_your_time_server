var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookStoreSchema = new Schema({
    name:{
        type: String
    },
    classify:[{
      name: {type:String}
  }]
});


module.exports = mongoose.model('bookStore', bookStoreSchema);