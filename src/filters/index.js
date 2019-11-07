import Vue from 'vue'
//import moment from 'moment'
import format from 'date-fns/format'
Vue.filter('dateString',function(value,dateStr='yyyy-MM-dd HH:mm:ss'){
    //return moment(value).format(format || ' YYYY-MM-DD HH: mm: ss' )
    return format(value, dateStr)
})