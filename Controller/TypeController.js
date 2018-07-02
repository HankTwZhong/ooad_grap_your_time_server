import  bodyParser from'body-parser';
import  Type from '../Type';

class TypeController {
    constructor(account){
        this.account = account;
    }
    addType (req, res){
        let type = req.body;
        console.log(this.account);
        this.account.calendar.addType(this.account.account, new Type(type.typeName,[]))
        res.send('Add Type Success');
    }
    deleteType (req, res){
        let typeName = req.body.typeName;
        this.account.calendar.deleteType(this.account.account, typeName);
        res.send('Delete Type Success');
    }
}

module.exports = TypeController;