import  bodyParser from 'body-parser';

class EventController {
    constructor(account){
        this.account = account;
    }

    addEvent(req, res){
        let event = req.body;
        this.account.calendar.addEvent(this.account.account, event)
        .then((result) =>{
            res.send(result);
        })
    }

    deleteEvent(req, res){
        let event = req.body;
        this.account.calendar.deleteEvent(this.account.account, event);
        res.send('delete Success');
    }
}

module.exports = EventController;