const dialog = require('./common/dialog.js'),
      apiHost = require('./common/api_host.js');
var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    this.isLogin()
    // this.isLogin((res)=>{
    //   if(res.errorCode === 0){

    //   }else if(res.errorCode === 2){
    //     this.getWxInfo();
    //   }
    // })
    // this.getWxInfo();
    this.getCurrentPosition();
    let role = wx.getStorageSync('role');//1为商家，2为用户
    // if(role === '1'){
    //   wx.reLaunch({
    //     url:'/pages/merchant/index/index'
    //   })
    // }else if(role === '2'){
    //   wx.switchTab({
    //     url: '/pages/personal/index/index',
    //   })
    // }
  },

  //时间戳转换: 传入毫秒时间戳!
  add0(m){ return m < 10 ? '0' + m : m },
  timeStampFormatter(timeStamp) {
    var time = new Date(timeStamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  },
  //时间转换
  transformTime: function (timeStamp) {
    let date = new Date(timeStamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + month + '-' + day;
  },
  transformTimes: function (timeStamp) {
    let date = new Date(timeStamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  },
  //中英文转换
  transformationStr(str){
    let returnStr = ''
    switch(str){
      case 'UNKNOWN' :
        returnStr = '未知'
        break
      case 'WOMAN' : 
        returnStr = '女'
        break
      case 'MAN' :
        returnStr = '男'
        break
      case 'wait_audit':
        returnStr = '待发布'
        break
      case 'unpay':
        returnStr = '已发布'
        break
      case 'onShelf':
        returnStr = '已发布'
        break
      case 'finish':
        returnStr = '已完成'
        break
    }
    return returnStr 
  },
  //上传图片
  upLoadImg: function (count,fn) {
    let _this = this;
    let imgList = [];
    wx.chooseImage({
      count: count,
      success: function (res) {
        wx.showLoading({
          title: '上传中……',
        })
        let tempFilePaths = res.tempFilePaths
        for (let i = 0; i < tempFilePaths.length ; i++){
          wx.uploadFile({
            url: `${apiHost.config.portalApiHost}/v1/base/upload/upload_image`,
            filePath: tempFilePaths[i],
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'upfile',
            success: function (res) {
              let data = JSON.parse(res.data);
              if (data.errorCode === 0) {
                imgList.push(data.body)
                if (i === tempFilePaths.length - 1){
                  fn && fn(imgList)
                }
              } else {
                dialog.showToast(data.msg)
              }
            },
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  //预览图片
  previewImage(current, urls){
    wx.previewImage({
      current,
      urls,
    })
  },
//定位当前位置
  getCurrentPosition() {
    let _this = this;
    qqmapsdk = new QQMapWX({
      key: 'EWHBZ-UKQKX-NYX4U-TAHAH-VHMYV-GVBNF'
    });
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        let latitude = res.latitude,
          longitude = res.longitude;
        wx.setStorageSync('latitude', latitude)
        wx.setStorageSync('longitude', longitude)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: function (r, data) {
            let currentCityName = r.result.address_component.city
            _this.getCityList((cityList)=>{
              cityList.map(item=>{
                if (item.cityName === currentCityName){
                  if (item.isLocalSystem){
                    wx.setStorageSync('cityCode', item.cityCode)
                    wx.setStorageSync('cityName', item.name)
                  }else{
                    _this.getNowCity()
                  }
                }
              })
            })
          }
        })
      },
    })
  },
  //获取代理商列表
  getCityList(fn) {
    this.get(`/base/franchisees`, {}, res => {
      if (res.errorCode === 0) {
        fn && fn(res.body)
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })

  },
  //获取当前代理商
  getNowCity(fn) {
    this.get(`/base/franchisees/current`, {}, res => {
      if (res.errorCode === 0) {
        console.log(11)
        wx.setStorageSync('cityCode', res.body.cityCode)
        wx.setStorageSync('cityName', res.body.name)
        fn && fn(res.body.name)
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })

  },  
  //获取微信信息
  getWxInfo () {
    let _this = this
    wx.login({
      success: res => {
        console.log(res)
        res.code && wx.setStorageSync('code', res.code)
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  _this.toLogin()
                }
              })
            }else{
              wx.navigateTo({
                url: '/pages/user/authorize/authorize',
              })
            }
          }
        })
      }
    })
  },
  //微信登录
  toLogin (state) {
    if (!wx.getStorageSync('rawData')){
      wx.navigateTo({
        url: '/pages/user/authorize/authorize',
      })
      return
    }
    let params = {
      code: wx.getStorageSync('code'),
      rawData: wx.getStorageSync('rawData'),
      state: state || ''
    }
    this.post('/base/login/wx/login',params,res=>{
      if(res.errorCode === 0){
        wx.setStorageSync('sessionid', res.body.JSESSIONID);
        wx.setStorageSync('openid', res.body.openid);
        wx.setStorageSync('isBinding', res.body.isBinding)
        wx.setStorageSync('portalUserType', res.body.portalUserType)
        wx.navigateBack({
          delta:1
        })
      }else{
        dialog.showToast(res.msg)
      }
    })
  },
  //是否登录
  isLogin(fn){
    console.log('verify_login',wx.getStorageSync('sessionid'))
    this.post(`/base/login/portal/verify_login`,{},res=>{
      fn && fn(res)
    })
  },
  //cookie
  getCookie (callback) {
    let header
    let sessionId = wx.getStorageSync('sessionid');
    if (sessionId != "" && sessionId != null) {
      header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + sessionId }
    } else {
      header = { 'content-type': 'application/x-www-form-urlencoded' }
    }
    if (callback) {
      callback(header)
    }
  },
  //get请求
  get (url, data, callback, callback2) {
    let _this = this;
    this.getCookie(function (header) {
      wx.request({
        url: `${apiHost.config.portalApiHost}${url}`,
        data: data,
        header: header,
        success: function success(res) {
          if (res.statusCode == 500) {
            dialog.hideLoading();
            dialog.showToast('服务器繁忙');
          }
          if(res.data.errorCode === 2){
            let portalUserType = wx.getStorageSync('portalUserType')
            if (portalUserType === 'EMPLOYER'){
              dialog.showModal('登录提示', '您还没有登录哦～请登录解锁\n更多惊喜！', r => {
                if (r.confirm) {
                  wx.navigateTo({
                    url: '/pages/merchant/system/login/login',
                  })
                }
              })
            }else{
              _this.getWxInfo()
            }          
          }
          callback && callback(res.data);

        }, fail: function fail(err) {
          dialog.hideLoading();
          dialog.showToast('网络出错');
          callback2 && callback2();
        }
      })
    })
  },
  //post请求
  post (url, data, callback, callback2) {
    let _this = this;
    this.getCookie(function (header) {
      wx.request({
        url: `${apiHost.config.portalApiHost}${url}`,
        data: data,
        method: 'POST',
        header: header,
        success: function success(res) {
          if (res.statusCode == 500) {
            dialog.hideLoading();
            dialog.showToast('服务器繁忙');
          } 
          if (res.data.errorCode === 2) {
            let portalUserType = wx.getStorageSync('portalUserType')
            if (portalUserType === 'EMPLOYER') {
              dialog.showModal('登录提示', '您还没有登录哦～请登录解锁\n更多惊喜！', r => {
                if (r.confirm) {
                  wx.navigateTo({
                    url: '/pages/merchant/system/login/login',
                  })
                }
              })
            }else{
              _this.getWxInfo()
            }
          }
          callback && callback(res.data);

        },
        fail: function fail(err) {
          dialog.hideLoading();
          dialog.showToast('网络出错');
          callback2 && callback2();
        }
      })
    })
  },
})