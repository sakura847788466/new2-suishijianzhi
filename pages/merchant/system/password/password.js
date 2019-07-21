const app = getApp(),
  dialog = require('../../../../common/dialog.js'),
  apiHost = require('../../../../common/api_host.js')
Page({
  data: {
    isCode: true,
    codeTimer: null,
    second: 60,
    eyeOpen: true,
    password: '',
  },
  //设置手机号
  setPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //设置验证码
  setCode(e) {
    this.setData({
      code: e.detail.value
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
    app.get(`/base/sms_verify_code/get_change_code`, { phone }, res => {
      if (res.errorCode === 0) {
        dialog.showToast('验证码已经发送至您的手机')
      } else if (res.errorCode !== 2){
        dialog.showToast(res.msg)
      }
    })
  },
  //控制密码显示
  handleEyeOpen() {
    this.setData({
      eyeOpen: !this.data.eyeOpen
    })
  },
  //设置密码
  setPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //修改
  toChange(){
    let phone = this.data.phone,
      code = this.data.code,
      newPwd = this.data.password;
    if (phone === '') {
      dialog.showToast('请输入手机号码')
      return
    } else if (phone.length !== 11) {
      dialog.showToast('请输入正确的手机号码')
      return
    } else if (code === '') {
      dialog.showToast('请输入验证码')
      return
    } else if (newPwd === '') {
      dialog.showToast('请输入新密码')
      return
    }
    app.post(`/portal/user/changePwd`, { phone, code, newPwd }, res => {//后台反馈登录超时
      if (res.errorCode === 0) {
        dialog.showToast('修改成功', 'success')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          }, 1000)
        })
      } else if (res.errorCode !== 2){
        dialog.showToast(res.msg)
      }
    })
  },
  onLoad: function (options) {
    let type = options.type //1：为忘记密码，2：为修改密码
    let title = '设置密码'
    if(type === '1'){
      title = '忘记密码'
    } else if (type === '2') {
      title = '修改密码'
    }
    wx.setNavigationBarTitle({
      title,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})