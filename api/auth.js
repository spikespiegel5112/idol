import request from '../src/js/request.js'
// 【公共号】微信分享
export function shareAuthNew(params) {
  return request({
    url: '/weixin/jsconfig',
    method: 'get',
    params:params
  })
}


// 【公共号】登录授权,获取token
export function getToken(params) {
  return request({
    url: '/security/auth/token/mp',
    method: 'get',
    params:params
  })
}

// 【公共号】获取授权地址
export function getWxUrl(params) {
  return request({
    url: '/weixin/oauth2',
    method: 'get',
    params:params
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/security/login/info',
    method: 'get'
  })
}
