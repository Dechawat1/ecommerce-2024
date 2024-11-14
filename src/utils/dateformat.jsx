import moment from 'moment/min/moment-with-locales'


export const dateFormat = (data)=>{
    return moment(data).locale('th').format('LL')
}