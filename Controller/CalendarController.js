import bodyParser from 'body-parser';
import Account  from '../Account';

class CalendarController {
    constructor(account){
        this.account = account;
    }
    getTypeList(req, res) {
        let calendar = this.account.calendar.getTypeList();
        res.send(calendar);
    }
    getChartInformation(req,res){
        let chartInformation = this.account.calendar.getChartInformation(req.query.startDate,req.query.endDate)
        res.send(chartInformation)
    }
    getEventList(req, res) {
        let eventList = this.account.calendar.getEventList();
        res.send(eventList);
    }
}

module.exports = CalendarController;