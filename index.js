import express from 'express';
let app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

import TypeController from './Controller/TypeController';
import EventController   from './Controller/EventController';
import CalendarController  from './Controller/CalendarController';
import Account   from './Account';
let account = new Account('admin', '1234');

let  calendarController = new CalendarController(account);
let  typeController  = new TypeController(account);
let  eventController = new EventController(account);

app.get('/type', calendarController.getTypeList.bind(calendarController));
app.get('/event', calendarController.getEventList.bind(calendarController));
app.get('/chartInformation', calendarController.getChartInformation.bind(calendarController));

app.post('/event', eventController.addEvent.bind(eventController));
app.delete('/event', eventController.deleteEvent.bind(eventController));
app.post('/type', typeController.addType.bind(typeController));
app.delete('/type', typeController.deleteType.bind(typeController));
app.listen(1321, function () {
    console.log('listening on port 1321!');
})
