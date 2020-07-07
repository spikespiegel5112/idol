import wx from 'weixin-js-sdk'
import { shareAuthNew, getWxUrl, getToken } from '../../api/auth'
import store from '../store/store'
import util from '../js/util';

console.log('wxjssdk', this)
/**
 * 微信分享的使用
 * shareParams = {
    share: true, // true可以分享；false不可以分享
    data: {
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
      success: function, // 用户确认分享后执行的回调函数
      cancel: function, // 用户取消分享后执行的回调函数
      trigger: function, // 用户点击分享按钮后执行的回调函数
      fail: function // 用户分享失败后执行的回调函数
    }
 * }
*/

function isEmpty (value) {
  if (typeof (value) === 'undefined' || value === null || value === '') {
    return true
  } else {
    return false
  }
}

var wxsdk = {
  appid: 'wxd636aaf31e161a64',
  wxReadyed: false,
  shareParams: {
    share: false, // true可以分享；false不可以分享
    data: {
      title: '', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接
      imgUrl: '', // 分享图标
      success: null, // 用户确认分享后执行的回调函数
      cancel: null, // 用户取消分享后执行的回调函数
      trigger: null, // 用户点击分享按钮后执行的回调函数
      fail: null // 用户分享失败后执行的回调函数
    }
  },
  initConfig: function (params) {
    var _this = this
    if (!isEmpty(params)) {
      _this.shareParams = params
    }
    if (_this.wxReadyed) {
      wx.hideOptionMenu()
      if (_this.shareParams.share) {
        wx.showMenuItems({
          menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
        })
        _this.wxShare()
      }
    } else {
      _this.shareAuth()
    }
  },
  /**
   * 配置信息
   */
  initWxShareConfig: function (data) {
    var _this = this
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp, // 生成签名的时间戳
      nonceStr: data.nonceStr, // 生成签名的随机串
      signature: data.signature, // 签名，见附录1
      jsApiList: ['checkJsApi', 'onMenuShareTimeline',
        'onMenuShareAppMessage', 'onMenuShareQQ',
        'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems',
        'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
        'translateVoice', 'startRecord', 'stopRecord',
        'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
        'uploadVoice', 'downloadVoice', 'chooseImage',
        'previewImage', 'uploadImage', 'downloadImage',
        'getNetworkType', 'openLocation', 'getLocation',
        'hideOptionMenu', 'showOptionMenu', 'closeWindow',
        'scanQRCode', 'chooseWXPay', 'openProductSpecificView',
        'addCard', 'chooseCard', 'openCard'
      ]
    })
    _this.wxShareReady()
  },

  /**
   * 初始化微信按钮
   */
  wxShareReady: function () {
    var _this = this
    wx.ready(function () {
      _this.wxReadyed = true
      // alert('wx ready')
      wx.hideOptionMenu()
      if (_this.shareParams.share) {
        wx.showMenuItems({
          menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
        })
        _this.wxShare()
      }
    })
  },

  /**
   * 微信分享
   */
  wxShare: function () {
    this.shareFriends()
    this.shareTimeline()
    this.shareQQ()
    this.shareWeibo()
    /*
    if (isEmpty(store.state.location)) {
      this.getLocation()
    }
    */
  },

  /**
   * 分享好友
   */
  shareFriends: function () {
    let _this = this
    let data = _this.shareParams.data
    wx.onMenuShareAppMessage({
      title: data.title,
      desc: data.desc,
      link: data.link,
      imgUrl: data.imgUrl,
      trigger: function (res) {
        if (!isEmpty(data.trigger)) {
          data.trigger()
        }
      },
      success: function (res) {
        if (!isEmpty(data.success)) {
          data.success()
        }
      },
      cancel: function (res) {
        if (!isEmpty(data.cancel)) {
          data.cancel()
        }
      },
      fail: function (res) {
        if (!isEmpty(data.fail)) {
          data.fail()
        }
      }
    })
  },

  /**
   * 分享朋友圈
   */
  shareTimeline: function () {
    let _this = this
    let data = _this.shareParams.data
    wx.onMenuShareTimeline({
      title: data.title,
      link: data.link,
      imgUrl: data.imgUrl,
      trigger: function (res) {
        if (!isEmpty(data.trigger)) {
          data.trigger()
        }
      },
      success: function (res) {
        if (!isEmpty(data.success)) {
          data.success()
        }
      },
      cancel: function (res) {
        if (!isEmpty(data.cancel)) {
          data.cancel()
        }
      },
      fail: function (res) {
        if (!isEmpty(data.fail)) {
          data.fail()
        }
      }
    })
  },

  /**
   * 分享到QQ
   */
  shareQQ: function () {
    let _this = this
    let data = _this.shareParams.data
    wx.onMenuShareQQ({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        if (!isEmpty(data.success)) {
          data.success()
        }
      },
      cancel: function () {
        if (!isEmpty(data.cancel)) {
          data.cancel()
        }
      }
    })
  },

  /**
   * 分享到微博
   */
  shareWeibo: function () {
    let _this = this
    let data = _this.shareParams.data
    wx.onMenuShareWeibo({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link, // 分享链接
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        if (!isEmpty(data.success)) {
          data.success()
        }
      },
      cancel: function () {
        if (!isEmpty(data.cancel)) {
          data.cancel()
        }
      }
    })
  },

  /**
   * 获取用户经伟度
   */
  getLocation: function ( callback ) {
    var _this = this
    wx.getLocation({
      success: function (res) {
        callback(res)
      },
      cancel: function (res) {
        alert('用户拒绝授权获取地理位置')
      }
    })
  },

  /**
   * 调用微信扫一扫
   */
  wxscanQRCode: function () {
    wx.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有:'qrCode', 'barCode'
      success: function (res) {
        // var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        // alert(JSON.stringify(res))
      }
    })
  },

  /**
   * 打开用户地理位置通过授权
   */
  openLocation: function (latitude, longitude, name, address) {
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
      scale: 25,
      infoUrl: null
    })
  },

  /**
   * 关闭窗口
   */
  closeWindow: function () {
    wx.closeWindow()
  },
  // 获取微信授权链接
  getWeChatAuthUrl () {
    let _this = this
    let params = {
      'redirectUri': _this.getUrl()
    }
    getWxUrl(params).then((res)=>{
      console.log('getWxUrl', res)
      window.location.href = res.data
    })
  },
  // 微信，根据code获取用户信息返回登录凭证
  getWechatAuthTokenByCode (params, callback) {
    let _this = this;
    return new Promise((resolve, reject)=>{
      getToken(params).then((res)=>{
        console.log('getToken', res)
        let authToken = res.data.access_token
        util.$webStorage.setItem('authToken', authToken)
        store.commit('setAccessToken', authToken)
        resolve(res.data)
        callback && callback(res.data)
        // location.href = location.href.split('.html')[0] + '.html'
      }).catch(error=>{
        console.log(error)
        // alert('获取accessToken失败啦！！！'+error)
        reject(error)
      })
    })

  },
  // 获取openid
  getOpenId (code, callback) {
    if (isEmpty(code)) {
      this.authBase()
      return false
    }
    let data = {
      project: 'pixseed',
      code: code
    }
    getOpenId(data).then((res) => {
      callback(res)
    })
  },
  /**
   * 静默授权获取用户openid
   */
  authBase: function () {
      var url = encodeURI('http://pixseed.nplusgroup.com/resource/doubleEleven/dist/index.html')
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_base&state=state1&connect_redirect=1#wechat_redirect";
  },
  // 微信网页分享接口
  shareAuth () {
    let _this = this
    let data = {
      'url': _this.getShareUrl()
    }
    shareAuthNew(data).then((res) => {
      _this.initWxShareConfig(res)
    })
  },
  // 获取url地址
  getUrl () {
    let url = location.href
    if (url.indexOf('?') !== -1 && url.indexOf('?') < url.indexOf('#')) {
      url = url.split('?')[0] + '#' + url.split('#')[1]
    }
    return url
  },
  getShareUrl () {
    let url = location.href
    if (url.indexOf('#') !== -1) {
      url = url.split('#')[0]
    }
    return url
  },
  stopShare () {
    let _this = this
    let params = {
      share: false
    }
    _this.initConfig(params)
  }
}

export default wxsdk
