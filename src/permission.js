import router from './router/router'
import util from './js/util'

import {
    errorRoutes
} from './router/router'
import store from '@/store/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: false
})


// Vue.prototype.$webStorage.setItem('authToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1NjMwNTI2OTUwNjUsImV4cCI6MTU2NTY0NDY5NSwidXNlciI6IntcImlkXCI6MSxcIm5hbWVcIjpcImFkbWluXCIsXCJuaWNrXCI6XCJhZG1pblwiLFwic3RhdHVzXCI6XCJhY3RpdmVcIixcInBob25lXCI6XCJhZG1pblwifSJ9.SThkJAbTQtHGFCa4D4ltReUOoxxyGRc2oR1fqRmFkTcCbyDpHvVD1QYeymCVYffZp3ngkdYXNqH2-7wPAH8auA')
router.beforeEach((to, from, next) => {
    const isEmpty = value => {
        return typeof (value) === 'undefined' || value === null || value === 'null' || value === '';
    };

    let authToken = util.$webStorage.getItem('authToken');
    let environment = util.$webStorage.getItem('environment');
    environment = 'others';
    const noAuthWriteList = ['showcase', 'album'];
    
    next()


});