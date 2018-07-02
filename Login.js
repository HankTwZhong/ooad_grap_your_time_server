import mongoose from 'mongoose';
// var connection = mongoose.connect('mongodb://localhost/timelog')
var db = mongoose.connection;

class Login {
    login(account, password){
        return new Promise((resolve, rejeect) => {

        })
    }
}

module.exports = new Login();