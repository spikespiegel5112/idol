import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let testPrefix = process.env.NODE_ENV === 'production' ? 'production' : 'test';

// alert(testPrefix === 'test' ? 'http://jgxzq.pengpai.nplusgroup.com/test/index.html' : `https://projects.thepaper.cn/jsp/jiaguo/index.html`)
const state = {
  title: 'aaa',
  accessToken: '',
  // accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1NDI2MTYxMTYzMzcsImV4cCI6MTU0Mjg3NTMxNiwidXNlciI6IntcImlkXCI6MSxcIm5hbWVcIjpcImFkbWluXCIsXCJuaWNrXCI6XCJhZG1pblwiLFwic3RhdHVzXCI6XCJhY3RpdmVcIixcImVtYWlsXCI6bnVsbCxcInBob25lXCI6bnVsbCxcImxhc3RQYXNzd29yZFJlc2V0RGF0ZVwiOm51bGwsXCJzZXNzaW9uS2V5XCI6bnVsbH0ifQ.BdNUqdSAYGwfR-SxWqupWpWb5AQUhIMGIpF2K7yFSthCr3--3LSjCYTAT9Pf9quNoJAXlQzGZklg1tvdOgSFQg',
  // loginId: '',
  loginId: '18260045855',
  // shareUrl: testPrefix === 'test' ? 'http://antisony.org/h5' : `https://projects.thepaper.cn/jsp/jiaguo/spring/index.html#/entrance`,
  shareUrl: 'http://antisony.org/h5',
  // bgmUrl: 'http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/ctzcf/ctzcf_entrance.mp3',
  bgmUrl: require('@/assets/audio/bgm2.mp3'),
  speechUrl: 'http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/ctzcf/ctzcf_speech.mp3',
  daishangerjiUrl: 'http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/music/daishangerji.mp3',

  userInfo: {},
  filmInfoData: {},
  WeixinJSBridgeInitFlag: false,
  WeixinJSBridgeReadyFlag: false,
  bgmFlag: false,
  speechFlag: false,
  openEntrance: false,
  currentLoadingPercentage: 0,
  backgroundList: [{
    active: true,
    src: require('../image/bg_1_00000.jpg')
    // src: '../image/bg_1_00000.jpg'
  }, {
    active: false,
    src: require('../image/bg_2_00000.jpg')
    // src: '../image/bg_2_00000.jpg'
  }, {
    active: false,
    src: require('../image/bg_3_00000.jpg')
    // src: '../image/bg_3_00000.jpg'
  }],

  flagList: [{
    content: '立足本职，实实在在，心无旁骛',
    chosen: false
  }, {
    content: '少看朋友圈，关心身边人',
    chosen: false
  }, {
    content: '套路少一点，出实招，谋良策',
    chosen: false
  }, {
    content: '身体是革命的本钱，努力奔跑瘦下来',
    chosen: false
  }, {
    content: '少开会、少填表，减负从我做起',
    chosen: false
  }, {
    content: '志之所趋，无远弗届，穷山距海，不能限也',
    chosen: false
  }, {
    content: '凝心聚力，加油干',
    chosen: false
  }, {
    content: '取关一批公号，退出一些群，拒绝荒废',
    chosen: false
  }, {
    content: '接受批评，也要学会赞美',
    chosen: false
  }, {
    content: '要积极不要丧，要高效不拖沓',
    chosen: false
  }, {
    content: '元气满满，正能量，多陪家人多休假',
    chosen: false
  }, {
    content: '今日事今日毕',
    chosen: false
  }, {
    content: '要有梦想，敢于追梦',
    chosen: false
  }, {
    content: '专注、专心、专业做好每个项目',
    chosen: false
  }, {
    content: '攒首付买房，安居乐业，不要老是飘着',
    chosen: false
  }, {
    content: '抓住行情，股票早日解套',
    chosen: false
  }, {
    content: '主动了解同事，发现有趣灵魂',
    chosen: false
  }, {
    content: '迟日江山丽，春风花草香。现在就出门，不宅！',
    chosen: false
  }, {
    content: '常回家，常看爸妈',
    chosen: false
  }, {
    content: '响应国家政策，争取再添一娃',
    chosen: false
  }, {
    content: '少买包多买书',
    chosen: false
  }, {
    content: '诚信经营，童叟无欺',
    chosen: false
  }, {
    content: '机会是争取来的，成功属于有准备的人',
    chosen: false
  }, {
    content: '至少捐一次款，献一次血',
    chosen: false
  }, {
    content: '用心做，零差评',
    chosen: false
  }, {
    content: '去天安门看一次升旗仪式，为祖国庆生',
    chosen: false
  }, {
    content: '牢骚太盛防肠断，风物长宜放眼量',
    chosen: false
  }, {
    content: '保持定力，处变不惊',
    chosen: false
  }, {
    content: '定期体检，不讳疾忌医',
    chosen: false
  }, {
    content: '每天学点外语，坚持打卡',
    chosen: false
  }, {
    content: '要深思熟虑，也要保持天真',
    chosen: false
  }, {
    content: '合理规划财务，稳增长防风险',
    chosen: false
  }, {
    content: '多学习他人长处，多包容不同观点',
    chosen: false
  }, {
    content: '开车不用手机，走路不闯红灯',
    chosen: false
  }, {
    content: '多陪孩子玩玩，少报两个辅导班',
    chosen: false
  }, {
    content: '有责任，有担当，有方法',
    chosen: false
  }, {
    content: '艰苦奋斗，勤俭节约，永不过时',
    chosen: false
  }, {
    content: '对老人更有耐心，对孩子不再“河东狮吼”',
    chosen: false
  }, {
    content: '少点抱怨，省点力气多打扫、勤快换来好心情',
    chosen: false
  }, {
    content: '成就新作为，展现新形象',
    chosen: false
  }, {
    content: '保持兴趣，淬炼本领',
    chosen: false
  }, {
    content: '要有同理心',
    chosen: false
  }],
  loadedFlag: false

};

const mutations = {
  openEntrance(state, payload) {
    state.openEntrance = true;
  },
  updateLoadingPercentage(state, payload) {
    state.currentLoadingPercentage = payload;
  },
  chooseFlagList(state, payload) {
    state.flagList[payload].chosen = !state.flagList[payload].chosen;
  },
  chooseBg(state, payload) {
    state.backgroundList.forEach((item, index) => {
      state.backgroundList[index].active = false;
    });
    state.backgroundList[payload].active = true;
  },
  turnOffWinningPrizeChance(state, payload) {
    state.winningPrizeChcation.href = url
  },
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
  setUserLoginId(state, payload) {
    state.loginId = payload;
  },
  setUserInfo(state, payload) {
    // debugger
    state.userInfo = payload;
  },
  setFilmInfoData(state, payload) {
    state.filmInfoData = payload;
  },
  setWeixinJSBridgeReadyFlag(state, payload) {
    state.WeixinJSBridgeReadyFlag = payload;
  },
  updateLoadedFlag: (state, payload) => {
    state.loadedFlag = payload
  }

};
const actions = {};

export default new Vuex.Store({
  state,
  mutations
});
