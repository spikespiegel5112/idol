<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {
        getUserInfoRequest: 'api/security/login/info',
        environment: ''
      }
    },
    // beforeCreate(){
    //   // alert('dsdsds')
    // },
    created() {
      // this.$vux.confirm.show({
      //   showCancelButton: false,
      //   title: '$checkDevice' + this.$checkDevice(),
      //   onConfirm() {
      //   }
      // });
      // debugger

      this.environment = this.$isEmpty(this.$webStorage.getItem('environment')) ? this.$checkEnvironment() : this.$webStorage.getItem('environment');


      console.log('auth', this.environment)
      // debugger
      if (this.environment === 'wechat') {
        // alert('begin auth+++++' + this.environment)


        let code = this.getParameter('code')
        let authToken = this.$webStorage.getItem('authToken')

        if (this.$isEmpty(code) && this.$isEmpty(authToken)) {
          this.$wxsdk.getWeChatAuthUrl()
        } else {
          if (!this.$isEmpty(authToken) && authToken !== 'null') {
            // alert('authToken+++' + authToken)
            this.getAndStoreUserInfoByAuthToken().then(response => {
              this.$webStorage.setItem('environment', 'wechat');
              this.redirectToBackRoute();

              // let backRoute = this.$webStorage.getItem('backRoute')
              // let url = location.href.split('.html')[0] + '.html'
              // if (!this.$isEmpty(backRoute)) {
              //   url = location.href.split('.html')[0] + '.html#' + backRoute
              // }
              // location.href = url
            })

          } else {
            let state = decodeURIComponent(this.getParameter('state').split('#')[0]);
            // alert('因为没有缓存token，所以code是' + code)
            // alert('state是' + state)
            let params = {
              code: code,
              state: state
            };
            // this.$vux.confirm.show({
            //   showCancelButton: false,
            //   title: 'code++++'+code,
            //   onConfirm() {
            //   }
            // });
            this.$wxsdk.getWechatAuthTokenByCode(params, () => {
              this.getAndStoreUserInfoByAuthToken().then(response => {


                this.redirectToBackRoute();
                this.$webStorage.setItem('environment', 'wechat');


                // let backRoute = this.$webStorage.getItem('backRoute')
                // let url = location.href.split('.html')[0] + '.html'
                // if (!this.$isEmpty(backRoute)) {
                //   url = location.href.split('.html')[0] + '.html#' + backRoute
                // }
                // location.href = url
              })
            })
          }

        }
      } else {

        // alert('begin auth+++++' + this.environment)
        this.$webStorage.setItem('environment', 'others');

        let authToken = this.$webStorage.getItem('authToken');
        if (!this.$isEmpty(authToken)) {

          this.getAndStoreUserInfoByAuthToken().then(response => {


            this.redirectToBackRoute();
          })
        } else {

          this.redirectToBackRoute();
        }


      }
    },
    mounted(){
      // alert('auth')
    },
    methods: {
      // 获取用户信息
      getAndStoreUserInfoByAuthToken(callback) {
        return new Promise((resolve, reject) => {
          // debugger
          this.$http.get(this.$baseURL + this.getUserInfoRequest).then(response => {
            response = response.data;
            console.log('userInfo', response)
            this.userInfo = response.userDetails;
            this.$webStorage.setItem('userInfo', JSON.stringify(response.userDetails));

            this.$store.commit('setUserInfo', this.userInfo);
            // this.sharePage();

            // let backRoute = this.$webStorage.getItem('backRoute')
            // let url = location.href.split('.html')[0] + '.html'
            // if (!this.$isEmpty(backRoute)) {
            //   url = location.href.split('.html')[0] + '.html#' + backRoute
            // }
            // location.href = url;


            resolve(response);
          }).catch(error => {
            console.log(error)

            error = error.data;
            alert(`(${error.errorNum}) ${error.errorMsg}`)
            reject(error);
          })
        })

      },
      redirectToBackRoute() {
        let backRoute = this.$webStorage.getItem('backRoute');


        let url = '';
        console.log(location.href.indexOf('.html'))

        if (location.href.indexOf('.html') > 0) {

          url = location.href.split('.html')[0] + '.html#' + backRoute;
        } else {

          url = location.origin + location.pathname + '#' + backRoute
        }

        // alert(this.environment + ' environment url is ' + url)
        setTimeout(() => {
          location.href = url;

        }, 100)
      },
      getParameter(key) {
        var url = location.href
        var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
        var paraObj = {}
        for (var i = 0, len = paraString.length; i < len; i++) {
          var j = paraString[i]
          paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length)
        }
        var returnValue = paraObj[key.toLowerCase()]
        if (typeof (returnValue) === 'undefined') {
          return ''
        } else {
          return returnValue
        }
      },
      isEmpty(value) {
        return typeof (value) === 'undefined' || value === null || value === ''
        // if (typeof (value) === 'undefined' || value === null || value === '') {
        //   return true
        // } else {
        //   return false
        // }
      },
      // 获取用户信息
      // getAndStoreUserInfoByAuthToken() {
      //   // debugger
      //   // alert(this.$webStorage.getItem('authToken'))
      //   let authToken = this.$webStorage.getItem('authToken')
      //   if ((authToken !== '' || authToken !== null || typeof (authToken) !== 'undefined') && this.$route.path !== '/auth') {
      //     this.$http.get(this.$baseURL + this.getUserInfoRequest).then(response => {
      //       response = response.data;
      //       console.log('userInfo', response)
      //       this.userInfo = response.userDetails;
      //       this.$webStorage.setItem('userInfo', JSON.stringify(response.userDetails));
      //       this.$store.commit('setUserInfo', this.userInfo);
      //       // this.sharePage();
      //     })
      //   }
      //
      // },
    }
  }
</script>
