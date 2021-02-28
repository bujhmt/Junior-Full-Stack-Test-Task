import moment from 'moment'

export const getTimeFromNow = (date: Date): string => {
    return moment(moment(date).format('YYYY-MM-DDTHH:mm:ss')).fromNow(true) + ' ago'
}