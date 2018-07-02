import Event from'./Event';
import TimeSetter from './TimeSetter.js';

class Type{
    constructor(typeName,eventList){
        this.typeName = typeName;
        this.eventList = eventList;
    }
    addEvent(_account, eventData,calendarSchema){
        return new Promise((resolve, reject)=>{
                this.eventList.push(new Event(eventData.title, eventData.start,eventData.end,eventData.desc));
                calendarSchema.findOneAndUpdate({account:_account, 'typeList.typeName':this.typeName},{$set: {'typeList.$.eventList':this.eventList}},{ new: true })
                .then((result)=>{
                        let filteredType = result.typeList.filter((type)=>{
                            if(type.typeName == this.typeName)
                            return type;
                        })
                        this.eventList = filteredType[0].eventList;
                    resolve(this.eventList);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    deleteEvent(_account, eventID,calendarSchema){
        this.eventList = this.eventList.filter((event)=>{
            if(_account === "Hank"){
                if(event._id !== eventID)
                    return event;
            }
            else
                if(event._id.toString() !== eventID)
                    return  event;
        })
        calendarSchema.update({account:_account, 'typeList.typeName':this.typeName},{$set: {'typeList.$.eventList':this.eventList}})
        .then((result)=>{
            console.log(result);
        })
    }

    getSpecifyPeriodDate(eventDate){
        
        let startDate = new Date(eventDate.start);
        let endDate = new Date(eventDate.end);
        let timeSetter = new TimeSetter();
        let iterativeTimes = timeSetter.timeFormatConvert(eventDate.times);
        let firstSpecifyStartTime = timeSetter.specifyDateAndTimeofFirstDay(startDate, startDate);
        let firstSpecifyEndTime = timeSetter.specifyDateAndTimeofFirstDay(startDate, endDate);
        let PeriodDate = timeSetter.iterativeAddStartAndEndTime(firstSpecifyStartTime, firstSpecifyEndTime,endDate , iterativeTimes);
        return PeriodDate;

    }
    addCycleEvent(_account, eventData,calendarSchema){
        return new Promise((resolve, reject)=>{
            let i;
            let PeriodDate ;
            PeriodDate = this.getSpecifyPeriodDate(eventData);
            let cycleDate = {};
            for( i=0 ; i <= PeriodDate['start'].length-1; i++ ){
                cycleDate.start = PeriodDate['start'][i]
                cycleDate.end = PeriodDate['end'][i]
                cycleDate.title = eventData['title']
                cycleDate.desc = eventData['desc']
                this.eventList.push(new Event( cycleDate.title,  cycleDate.start, cycleDate.end, cycleDate.desc));
            }
            calendarSchema.findOneAndUpdate({account:_account, 'typeList.typeName':this.typeName},{$set: {'typeList.$.eventList':this.eventList}},{ new: true })
                .then((result)=>{
                        let filteredType = result.typeList.filter((type)=>{
                            if(type.typeName == this.typeName)
                            return type;
                        })
                        this.eventList = filteredType[0].eventList;
                    resolve(this.eventList);
                })
                .catch((err)=>{
                    reject(err);
            })
        })
    }
}
module.exports = Type;