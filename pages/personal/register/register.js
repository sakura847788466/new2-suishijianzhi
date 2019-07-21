const app = getApp(),
  dialog = require('../../../common/dialog.js'),
  apiHost = require('../../../common/api_host.js')
Page({
  data: {
    isAgrred: false, //同意条款
    isCode: true, //'获取验证码' or 'XX秒后重新获取'
    codeTimer: null,
    second: 60,
    phone: '',
    setCode: '' //验证码
  },
  //同意条款
  agrredClause() {
    this.setData({
      isAgrred: !this.data.isAgrred
    })
  },
  //设置手机号
  setPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getCode() {
    let phone = this.data.phone
    if (phone === '') {
      dialog.showToast('请输入手机号')
      return
    } else if (phone.length !== 11) {
      dialog.showToast('请输入正确的手机号码')
      return
    }
    let timer = setInterval(() => {
      let nowSecond = this.data.second - 1
      if (nowSecond <= 0) {
        clearInterval(this.data.secondTimer)
        this.setData({
          secondTimer: null,
          isCode: true,
          second: 60
        })
      } else {
        this.setData({
          second: nowSecond
        })
      }
    }, 1000)
    this.setData({
      isCode: false,
      secondTimer: timer
    })
    app.get(`/base/sms_verify_code/get_binding_code`, {
      phone
    }, res => {
      if (res.errorCode === 0) {

      } else {
        dialog.showToast(res.msg)
      }
    })
  },
  //设置验证码
  setCode(e) {
    this.setData({
      setCode: e.detail.value
    })
  },
  //设置推荐码
  setInviterCode(e){
    this.setData({
      inviterCode:e.detail.value
    })
  },
  complete() {
    let param = {
      phone: this.data.phone,
      code: this.data.setCode,
      inviterCode: this.data.inviterCode
    }
    if (param.phone === '') {
      dialog.showToast('请输入手机号码')
      return
    } else if (param.phone.length !== 11) {
      dialog.showToast('请输入正确的手机号码')
      return
    } else if (param.code === '') {
      dialog.showToast('请输入验证码')
      return
    } else if (!this.data.isAgrred) {
      dialog.showToast('请阅读并同意服务条款')
      return
    }
    app.post(`/portal/user/bindPhone`, param, res => {
      if(res.errorCode === 0){
        wx.setStorageSync('isBinding', true)
        wx.setStorageSync('portalUserType', 'STAFF')
        dialog.showToast('绑定成功','success')
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/personal/index/index',
          })
        }, 1000)
      }else{
        dialog.showToast(res.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})