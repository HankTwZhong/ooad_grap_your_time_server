import moment from 'moment'
class ChartInformation {
    constructor(){
        this.chartInformationList=[];
    }
    getChartInformation(typeList,  startDate, endDate){
        let filteredTypeList = this.filterTypeList(typeList,startDate,endDate)
        return  this.makeChartInformation(filteredTypeList)
    }
    filterTypeList(typeList,  startDate, endDate){
        let filteredList=[]
        for(let i = 0 ; i<typeList.length;i++){
            filteredList.push({
                typeName :typeList[i].typeName,
            })
            filteredList[i].eventList = typeList[i].eventList.slice()
        }
        filteredList.forEach((type)=>{
            type.eventList = type.eventList.filter((event)=>{
                if (event.start > new Date(startDate) && event.end < new Date(endDate))
                return event
            })
        })
        filteredList = filteredList.filter((type)=>{
            if(type.eventList.length > 0)
            return type
        })
        return filteredList
    }
    makeChartInformation(filteredList){
        filteredList.forEach((type)=>{
            type.totalSpentHours = 0
            type.eventList.forEach((event)=>{
                type.totalSpentHours += (event.end - event.start)/ 1000 / 60 / 60
            })
        })
        return filteredList
    }
}

module.exports = ChartInformation;