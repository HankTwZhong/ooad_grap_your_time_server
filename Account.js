import mongoose from 'mongoose';
let connection = mongoose.connect('mongodb://localhost/timelog');
let db = mongoose.connection;
import calendarSchema  from './Schemas/calendarSchema';
import Calendar from './Calendar';
import Type from './Type';

class Account {
    constructor(account, password){
        this.account = account;
        this.password = password;
        this.createCaldendar().then((result)=>{
            this.calendar = result
        })
    }

    createCaldendar(){
        return new Promise((resolve, reject) =>{
            calendarSchema.find({account:this.account}).then((result)=>{
                let typeList = []
                result[0].typeList.forEach((type)=>{
                    typeList.push(new Type( type.typeName, type.eventList));
                });
                resolve( new Calendar(typeList));
            })
        })
    }
}

module.exports = Account;