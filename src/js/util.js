// import $ from 'jquery';
import wx from 'weixin-js-sdk'
import store from '../store/store';

let util = {};


util.$webStorage = {
  type: '',
  setItem(name, payload) {
    // console.log(this.type);
    switch (this.type) {
      case 'localStorage':
        localStorage.setItem(name, payload);
        break;
      case 'sessionStorage':
        sessionStorage.setItem(name, payload);
        break;
      default:
        alert('未设置存储类型，无法存储');
        break;
    }
  },
  getItem(name) {
    // console.log(this.type);
    let result;
    switch (this.type) {
      case 'localStorage':
        result = localStorage.getItem(name);
        break;
      case 'sessionStorage':
        result = sessionStorage.getItem(name);
        break;
      default:
        alert('未设置存储类型，无法获取');
        break;
    }
    return result;
  }
};

util.install = function (Vue) {

  Object.keys(util).forEach((item, index) => {
    if (item !== 'install') {
      Vue.prototype[item] = util[item];
    }
  });

  Vue.prototype.$clickSound = () => {
    let audioInstance = new Audio();
    audioInstance.src = require('../assets/audio/click_sound.mp3');
    // audioInstance.src = require('http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/ctzcf/ctzcf_speech.mp3');
    // audioInstance.src = 'http://pp-jgxzq.oss-cn-qingdao.aliyuncs.com/ctzcf/ctzcf_speech.mp3';
    audioInstance.play();
  }

  // Vue.component(imageClipper.name, imageClipper);
  // Vue.component('mImageCrop', mImageCrop);

  Vue.prototype.$audioPlayback = options => {
    options = Object.assign({
      play: true,
      src: '',
      loop: false,
      autoplay: false,
      icon: true,
      el: 'body'
    }, options);

    let audioInstance = new Audio();
    audioInstance.src = options.src;
    audioInstance.loop = options.loop;
    audioInstance.play().then(() => { }).catch(error => {
      console.log(error)
    });

    const templateString = "<a></a><p class='loading'>音乐载入中</p>";

    let templateNode = document.createElement('div');
    let instanceId = 'commonAudio' + Date.parse(new Date());

    console.log('templateNode', templateString)

    templateNode.setAttribute('id', instanceId);
    templateNode.setAttribute('class', 'common_musicbutton_wrapper active');
    templateNode.setAttribute('active', 'true');
    templateNode.innerHTML = templateString;

    if (options.icon) {
      document.querySelector(options.el).appendChild(templateNode)

      let instanceElement = document.getElementById(instanceId)
      instanceElement.addEventListener('click', () => {
        if (!audioInstance.paused) {
          audioInstance.pause();
          instanceElement.classList.remove('active');
        } else {
          audioInstance.play();
          instanceElement.classList.add('active')

        }
      })
    }
  };

  Vue.prototype.$checkDevice = () => {
    const ua = navigator.userAgent;
    let deviceDictionary = [{
      name: 'ios',
      method: "window.webkit.messageHandlers.token.postMessage('')",
      checker: 'window.webkit',
      getter: 'window.webkit.messageHandlers.token',
      status: false
    }, {
      name: 'android',
      method: 'window.android.getToken()',
      // checker: 'window.android',
      checker: "ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1",
      getter: 'window.android.getToken()',
      status: false
    }, {
      name: 'others',
      checker: "console",
      getter: '',
      status: false
    }];
    let device;
    let that = this;
    for (let i = 0; i < deviceDictionary.length; i++) {
      let item = deviceDictionary[i];
      if (item.name === 'ios' && window.webkit !== undefined) {
        device = eval(item.checker) ? item.name : '';
      } else {
        // device = eval(item.checker) !== undefined ? item.name : '';
        device = eval(item.checker) !== undefined && eval(item.checker) ? item.name : ''
      }
      if (device !== '') {
        break;
      }
    }

    // device = 'ios';
    // alert('device++++'+device)
    return device;
  };

  Vue.prototype.$checkEnvironment = () => {
    const ua = navigator.userAgent;
    console.log('us', ua)
    let environmentDictionary = [{
      name: 'wechat',
      checker: ua.toLowerCase().match(/MicroMessenger/i),
      getter: '',
      status: false
    }, {
      name: 'ios',
      method: "window.webkit.messageHandlers.token.postMessage('')",
      checker: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      getter: 'window.webkit.messageHandlers.token',
      status: false
    }, {
      name: 'android',
      method: 'window.android',
      checker: ua.match(/(Android)\s+([\d]+)/),
      getter: 'window.android.getToken()',
      status: false
    }];
    let environment;
    let checkerMatchedFlag = false;
    environmentDictionary.forEach((item, index) => {
      if (item.checker) {
        environment = item.name;
      }
    });
    let result = environmentDictionary.filter(item => item.checker);
    environment = result.length > 0 ? result[0].name : 'unknown'
    // console.log(environment)
    // alert('environment++++++' + environment)

    return environment;
  };

  Vue.prototype.$webStorage = {
    type: '',
    setItem(name, payload) {
      // console.log(this.type);
      switch (this.type) {
        case 'localStorage':
          localStorage.setItem(name, payload);
          break;
        case 'sessionStorage':
          sessionStorage.setItem(name, payload);
          break;
        default:
          alert('未设置存储类型，无法存储');
          break;
      }
    },
    getItem(name) {
      // console.log(this.type);
      let result;
      switch (this.type) {
        case 'localStorage':
          result = localStorage.getItem(name);
          break;
        case 'sessionStorage':
          result = sessionStorage.getItem(name);
          break;
        default:
          alert('未设置存储类型，无法获取');
          break;
      }
      return result;
    }
  };

  Vue.prototype.$isEmpty = value => {
    return typeof (value) === 'undefined' || value === null || value === ''
  };

  Vue.prototype.$replaceProtocol = (url) => {
    let result;
    // result = process.env.NODE_ENV === 'production' ? url.replace('http://', 'https://').replace('fnvalley.com', 'fnvalley.com') : url;
    result = url.replace('http://', 'https://').replace('fnvalley.com', 'fnvalley.com');
    return result;
  }

  Vue.prototype.$generateUUID = (options) => {
    options = Object.assign({
      len: 32,
      radix: 16
    }, options);
    let result;
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    let len = options.len;
    let radix = options.radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data. At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    result = uuid.join('');
    return result;
  }


  Vue.prototype.$getDevice = (options) => {
    //判断访问终端
    let u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === " qq" //是否QQ
    };
  }

  Vue.prototype.$remResizing = params => {
    let options = Object.assign({
      fontSize: 16,
      baseline: 320,
      threshold: 0,
      basedonnarrow: false,
      basedonwide: false,
      dropoff: false,
      alignCenter: true,
      inward: false
    }, params);
    const htmlEl = document.getElementsByTagName('html')[0];
    const bodyEl = document.getElementsByTagName('body')[0];


    const windowHeight = window.screen.availHeight
    const windowWidth = window.screen.availWidth
    let frontLine = windowWidth

    const sizeConstraint = function () {
      if (options.basedonnarrow) {
        orientationSensor({
          portrait: function () {
            frontLine = window.screen.availWidth;
          },
          landscape: function () {
            frontLine = window.screen.availHeight;
          }
        });
      } else {
        frontLine = window.screen.availWidth;
      }
      var factor = 0;
      if (options.baseline === 0) {
        factor = 1;
      } else if (frontLine <= options.baseline) {
        if (options.inward) {
          factor = frontLine / options.threshold;
        } else {
          factor = frontLine / options.baseline;
        }
      } else if (frontLine > options.baseline && frontLine <= options.threshold || options.threshold === 0) {
        if (options.threshold >= 0) {
          if (options.inward) {
            factor = frontLine / options.threshold + 'px';
          } else {
            factor = frontLine / options.baseline;
          }
        }
        if (options.alignCenter) {
          bodyEl.style.margin = '0'
          bodyEl.style.width = 'auto'
        }
      } else if (frontLine > options.threshold) {

        if (options.alignCenter) {
          factor = options.threshold / options.baseline;
          bodyEl.style.margin = '0 auto'
          bodyEl.style.width = options.threshold + 'px';
        } else {
          factor = frontLine / options.baseline;
          bodyEl.style.margin = 0
          bodyEl.style.width = options.threshold + 'px';
        }


        if (options.dropoff) {
          htmlEl.style.fontSize = 'none'
          return;
        }
      }
      htmlEl.style.fontSize = options.fontSize * factor + 'px';

      if (options.dropoff && frontLine > options.threshold) {
        htmlEl.style.fontSize = ''
      }
    };

    if (options.baseline <= 0) {
      options.baseline = 1;
    }
    sizeConstraint();
    window.onresize = () => {
      console.log('onresize')
      sizeConstraint();
    }
  }
  Vue.prototype.$generateUrlParams = data => {
    let result = '?';
    Object.keys(data).forEach((item, index) => {
      if (index < Object.keys(data).length - 1) {
        result += item + '=' + data[item] + '&';
      } else {
        result += item + '=' + data[item];
      }
    });
    return result;
  };


  Vue.prototype.$generateRandomList = count => {
    let orderedArr = [];
    let upsetArr = [];
    let loopTimes = count;
    let rand = 0;

    for (let i = 0; i < count; i++) {
      orderedArr.push(i);
    }
    console.log(orderedArr);
    //真随机算法
    for (let i = 0; i < loopTimes; i++) {
      rand = parseInt(Math.floor(Math.random() * count));
      for (let j = 0; j < i; j++) {
        if (upsetArr[j] === rand) {
          upsetArr.splice(j, 1);
          loopTimes++;
        }
      }
      upsetArr.push(rand);
    }
    return upsetArr;
  };


  Vue.prototype.$autoHeight = options => {
    options = Object.assign({
      reference: '',
      target: '',
      content: 'body',
      offset: 0,
      scale: 1,
      minHeight: 0,
      returnValue: false,
      force: false
    }, options);
    let windowHeight = screen.availHeight;

    let targetHeight = 0;
    let referenceHeight = options.reference !== '' ? document.querySelector(options.reference).availHeight : 0;
    let contentHeight = document.querySelector(options.content).scrollHeight;
    let pageHeight = document.body.scrollHeight;
    let offset = Number(options.offset);
    if (referenceHeight < options.minHeight || windowHeight < options.minHeight) {
      targetHeight = options.minHeight * options.scale;
    } else if (referenceHeight > windowHeight) {
      targetHeight = referenceHeight * options.scale + offset;
    } else if (contentHeight > windowHeight) {
      targetHeight = contentHeight * options.scale + offset;
    } else {
      targetHeight = windowHeight * options.scale + offset;

      // $(window).resize(function () {
      //     pageHeight = document.body.scrollHeight;
      //     targetHeight = windowHeight * options.scale + offset;
      // });
    }


    if (options.returnValue) {
      return targetHeight;
    } else {
      if (document.body.scrollHeight > targetHeight) {

        if (options.force) {
          document.querySelector(options.target).style.height = targetHeight;
        }
      } else {

        document.querySelector(options.target).style.height = targetHeight;

      }
    }
    console.log('document.body.scrollHeight', document.body.scrollHeight)
    console.log('targetHeight', targetHeight)
  };

  Vue.prototype.$quickSort = (arr) => {
    let that = this;
    //如果数组<=1,则直接返回
    if (arr.length <= 1) {
      return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    //找基准，并把基准从原数组删除
    let pivot = arr.splice(pivotIndex, 1)[0];
    //定义左右数组
    let left = [];
    let right = [];

    //比基准小的放在left，比基准大的放在right
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    //递归
    return Vue.prototype.$quickSort(left).concat([pivot], Vue.prototype.$quickSort(right));
  };


  // Vue.prototype.$align = (options) => {
  //   options = $.extend({
  //     position: 'both',
  //     target: '',
  //     container: '',
  //     positive: false,
  //     isImage: false,
  //     offsetX: 0,
  //     offsetY: 0,
  //     ignoreY: 0,
  //     ignoreX: 0
  //   }, options);

  //   let that = $(options.target),
  //     imgSrc = that.attr('src'),
  //     reload = false,
  //     container = $(options.container),
  //     thisWidth = 0,
  //     thisHeight = 0,
  //     containerWidth = 0,
  //     containerHeight = 0,
  //     timer,
  //     imageObj = new Image(),
  //     offsetX = Number(options.offsetX),
  //     offsetY = Number(options.offsetY),
  //     ignoreX = Number(options.ignoreX),
  //     ignoreY = Number(options.ignoreY),
  //     ignoredElX = '',
  //     ignoredElY = '',
  //     windowWidth = $(window).width(),
  //     windowHeight = $(window).height();
  //   //_this.attr('src', imgSrc + '?' + Date.parse(new Date()))
  //   let tools = {
  //     calculateIgnore: function () {
  //       if (typeof options.ignoreY === 'string' || typeof options.ignoreX === 'string') {
  //         let ignoreArrX = options.ignoreX.split(','),
  //           ignoreArrY = options.ignoreY.split(',');
  //         for (let i = 0; i < ignoreArrX.length; i++) {
  //           ignoreX += $(ignoreArrX[i]).width();
  //         }
  //         for (let i = 0; i < ignoreArrY.length; i++) {
  //           ignoreY += $(ignoreArrY[i]).height();
  //         }
  //         ignoredElX = $(ignoreArrX.join(','));
  //         ignoredElY = $(ignoreArrY.join(','));
  //         console.log(ignoreY);
  //       } else {
  //         ignoreX = options.ignoreX;
  //         ignoreY = options.ignoreY;
  //       }
  //     }
  //   };
  //   initAligning();
  //   $(window).resize(function () {
  //     initAligning();
  //   });

  //   function initAligning() {
  //     //当居中元素是img标签时，特殊处理！
  //     if (that.is('img')) {
  //       //递归判断需要居中的图片是否加载完成，如果没有就重载
  //       let checkImageLoaded = function () {
  //         that.each(function (index) {
  //           let $this = $(options.target);
  //           let imageSrc = $this.attr('src');
  //           containerWidth = container.eq(index).width();
  //           containerHeight = container.eq(index).height();
  //           if ($this.height() <= 0) {
  //             imageObj.src = imageSrc;

  //             // console.log($this.outerWidth())
  //             checkPosition($this, imageObj.width, imageObj.height);
  //           } else {
  //             checkPosition($this);
  //           }
  //         });
  //       };
  //       checkImageLoaded();
  //       //缺省情况
  //     } else {

  //       //需要遍历每个居中对象，判断其每个container尺寸不同时，需分别处理
  //       //当设置了container时，以container尺寸大小居中
  //       if (options.container != '') {
  //         for (let i = 0; i < that.length; i++) {
  //           let $this = $(options.target);
  //           containerHeight = container.eq(i).height();
  //           containerWidth = container.eq(i).width();
  //           console.log(containerHeight);

  //           if ($this.is(':hidden')) {
  //             return true;
  //           } else {
  //             checkPosition($this);
  //           }
  //         }
  //         //当没有设置container时，以窗口尺寸大小居中
  //       } else {
  //         containerWidth = $(window).width();
  //         containerHeight = $(window).height();
  //         that.each(function (index) {
  //           let $this = $(options.target);
  //           if ($this.is(':hidden')) {
  //             return true;
  //           } else {
  //             checkPosition($this);
  //           }
  //         });
  //       }
  //     }
  //   }

  //   function checkPosition(_this, imageWidth, imageHeight) {
  //     let marginY, marginX;

  //     checkBrowser({
  //       ie: function () {
  //         window.clearTimeout(timer);
  //       },
  //       other: function () {
  //         clearTimeout(timer);
  //       }
  //     });

  //     if (arguments[1] != null && arguments[2] != null) {
  //       thisWidth = imageWidth;
  //       thisHeight = imageHeight;

  //     } else {
  //       thisWidth = _this.outerWidth();
  //       thisHeight = _this.outerHeight();
  //     }

  //     switch (options.position) {
  //       case 'both':
  //         // console.log(thisHeight)
  //         marginY = (containerHeight - thisHeight) / 2;
  //         marginX = (containerWidth - thisWidth) / 2;
  //         if (options.positive && marginY < 0 || marginX < 0) {
  //           marginY = marginX = 0;
  //         }
  //         if (thisWidth <= containerWidth) {
  //           if (options.offsetX !== 0) {
  //             _this.css({
  //               'margin': marginY + offsetY - ignoreY + 'px ' + (containerWidth - thisWidth) / 2 + offsetX - ignoreX + 'px'
  //             });
  //           } else {
  //             _this.css({
  //               'margin': marginY + offsetY - ignoreY + 'px auto'
  //             });
  //           }
  //         } else {
  //           let marginX = (containerWidth - thisWidth) / 2;
  //           _this.css({
  //             'margin': marginY + offsetY - ignoreY + 'px ' + (marginX + options.offsetX) + 'px'
  //           });
  //         }
  //         break;
  //       case 'top':
  //         aligning(function (thisWidth, thisHeight) {
  //           _this.css({
  //             'margin': '0 ' + ((containerWidth - thisWidth) / 2 + offsetX - ignoreX) + 'px'
  //           });
  //         });
  //         break;
  //       case 'right':
  //         if (thisHeight <= containerHeight) {
  //           if (options.offsetY !== 0) {
  //             _this.css({
  //               'margin': marginY + offsetY - ignoreY + 'px 0'
  //             });
  //           } else {
  //             _this.css({
  //               'margin': marginY + offsetY - ignoreY + 'px 0'
  //             });
  //           }
  //         } else {
  //           marginX = (containerWidth - thisWidth) / 2;
  //           _this.css({
  //             'margin': (containerHeight - thisHeight) / 2 + offsetY - ignoreY + 'px 0'
  //           });
  //         }


  //         // aligning(function(thisWidth, thisHeight) {
  //         // 	_this.css({
  //         // 		'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 ' + (containerWidth - thisWidth) + 'px'
  //         // 	});
  //         // });
  //         break;
  //       case 'bottom':
  //         aligning(function (thisWidth, thisHeight) {
  //           tools.calculateIgnore();
  //           if (ignoreY <= windowHeight) {
  //             _this.css({
  //               'margin': (windowHeight - thisHeight + offsetY - ignoreY) + 'px auto 0'
  //             });
  //             console.log(ignoreY);
  //             console.log(windowHeight);
  //           }
  //           ;
  //         });
  //         break;
  //       case 'left':
  //         aligning(function (thisWidth, thisHeight) {
  //           _this.css({
  //             'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 0'
  //           });
  //         });
  //         break;
  //     }
  //   }

  //   function aligning(callback) {
  //     thisWidth = that.outerWidth();
  //     thisHeight = that.outerHeight();
  //     return callback(thisWidth, thisHeight);
  //   }

  //   function checkBrowser(callback) {
  //     callback = $.extend({
  //       ie: function () {
  //       },
  //       other: function () {
  //       }
  //     }, callback);
  //     if (navigator.appName.indexOf('Explorer') > -1) {
  //       console.log('IE');
  //       callback.ie();
  //     } else {
  //       // console.log('other')
  //       callback.other();
  //     }
  //   }

  //   //屏幕方向探测器
  //   function orientationSensor(callback) {
  //     let windowWidth = $(window).width(),
  //       windowHeight = $(window).height(),
  //       orientation = '';
  //     callback = $.extend({
  //       portrait: function () {
  //       },
  //       landscape: function () {
  //       },
  //       orientationchange: function (windowWidth, windowHeight) {
  //       }
  //     }, callback);

  //     checkoritation();
  //     $(window).resize(function () {
  //       checkoritation();
  //     });

  //     function checkoritation() {
  //       callback.orientationchange();
  //       if (windowWidth < windowHeight) {
  //         return callback.portrait();
  //       } else {
  //         return callback.landscape();
  //       }
  //     }

  //     return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
  //   }


  // };

  Vue.prototype.$getDevice = (options) => {
    //判断访问终端
    let u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === " qq" //是否QQ
    };
  }


};
export default util;
