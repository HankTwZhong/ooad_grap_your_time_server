import moment from 'moment';
class TimeSetter {
    constructor(){
        // Do not do anything at the current stage;
    }
    timeFormatConvert(stringOfTime){
        let parserStringToNumber ;
        if(stringOfTime === '一週')
            parserStringToNumber = 7;
        else
            parserStringToNumber = 1;
        return parserStringToNumber;
    }
    specifyDateAndTimeofFirstDay(specifyDate, specifyTime){
        let _specifyDate = moment(specifyDate);
        let _specifyTime = moment(specifyTime);
        return (
            new Date(moment().set({
            'year': _specifyDate.get('year'),
            'month':_specifyDate.get('month'),
            'date': _specifyDate.get('date'),
            'hours': _specifyTime.get('hours'),
            'minute': _specifyTime.get('minute'),
            'second': _specifyTime.get('second'),
            'millisecond' :_specifyTime.get('millisecond')
            }))
        )

    }
    iterativeAddStartAndEndTime(firstDayStartTime, firstDayEndTime, endDateOfPeriodDate, iterativeTime){
        let Times = iterativeTime;
        let iteratorDate;
        let specifyStartTime = moment(firstDayStartTime);
        let specifyEndTime = moment(firstDayEndTime);
        let specifyStartPeriodDate = [];
        let specifyEndPeriodDate = [];
        specifyStartPeriodDate.push(moment(firstDayStartTime).toJSON());
        specifyEndPeriodDate.push(moment(firstDayEndTime).toJSON());
        while( (iteratorDate = (moment(specifyStartPeriodDate[specifyStartPeriodDate.length-1]).add(Times, 'day'))) < moment(endDateOfPeriodDate)){
            let iteratorStartDate = moment().set({
                'year': iteratorDate.get('year'),
                'month':iteratorDate.get('month'),
                'date': iteratorDate.get('date'),
                'hours': specifyStartTime.get('hours'),
                'minute': specifyStartTime.get('minute'),
                'second': specifyStartTime.get('second'),
                'millisecond' :specifyStartTime.get('millisecond')
            });
            let iteratorEndDate =  moment().set({
                'year': iteratorDate.get('year'),
                'month':iteratorDate.get('month'),
                'date': iteratorDate.get('date'),
                'hours': specifyEndTime.get('hours'),
                'minute': specifyEndTime.get('minute'),
                'second': specifyEndTime.get('second'),
                'millisecond' :specifyEndTime.get('millisecond')
            });
            specifyStartPeriodDate.push(new Date(iteratorStartDate).toJSON());
            specifyEndPeriodDate.push(new Date(iteratorEndDate).toJSON());
        }
        let specifyPeriodDate = {};
        specifyPeriodDate['start'] = specifyStartPeriodDate;
        specifyPeriodDate['end'] = specifyEndPeriodDate;
        return specifyPeriodDate;

    }
}
module.exports = TimeSetter;