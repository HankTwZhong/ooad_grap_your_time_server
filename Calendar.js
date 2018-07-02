import Account from './Account';
import ChartInformation from './ChartInformation';
import mongoose from 'mongoose';
var db = mongoose.connection;
import calendarSchema from './Schemas/calendarSchema';
import Type from './Type';


class Calendar {
    constructor(typeList){
        this.typeList = typeList ;
    }
    addType(_account,typeObj){
        if(this.typeList.map((type)=>{
            return type.typeName
        }).indexOf(typeObj.typeName)=== -1){
            this.typeList.push(typeObj);
            calendarSchema.update({account:_account},{$set: {typeList:this.typeList}})
            .then((result) => {
                console.log(result);
            })
        }
        else
            console.log('same Type');
    }
    deleteType(_account,typeName){
        this.typeList = this.typeList.filter((type)=>{
            return type.typeName !== typeName;
        })
        calendarSchema.update({account:_account},{$set: {typeList:this.typeList}})
        .then((result) => {
            console.log(result);
        })
    }

    getTypeList(){
        return this.typeList;
    }
    getChartInformation(startDate,endDate){
        let chartInformation = new ChartInformation()
        return chartInformation.getChartInformation(this.typeList,startDate,endDate)
    }
    addEvent(_account, eventData){
        return new Promise((resolve, reject)=>{
            let findType = this.typeList.filter((type)=>{
                if(type.typeName === eventData.title)
                    return  type
            })
            if(eventData.checked === true ){
                findType[0].addCycleEvent(_account, eventData, calendarSchema)
                .then((result)=>{
                    resolve(result);
                })
                .catch((err)=>{
                    reject(err);
                })
            }
            else{
                findType[0].addEvent(_account, eventData, calendarSchema)
                .then((result)=>{
                    resolve(result);
                })
                .catch((err)=>{
                    reject(err);
                })
            }
        })

    }

    deleteEvent(_account, eventData){

        let findType = this.typeList.filter((type)=>{
            if(type.typeName === eventData.title)
                return type;
        })
        findType[0].deleteEvent(_account, eventData._id,calendarSchema);
    }

    getEventList(){
        let eventList = [];
        // console.log('here:'+JSON.stringify(this.typeList))
        this.typeList.forEach((type)=>{
            type.eventList.forEach((event)=>{
                eventList.push(event);
            })
        })
        return eventList;
    }
}


module.exports = Calendar ;