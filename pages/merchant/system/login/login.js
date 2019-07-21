const app = getApp(),
  dialog = require('../../../../common/dialog.js'),
  apiHost = require('../../../../common/api_host.js')
Page({
  data: {
    phone:'',
    password:'',
    eyeOpen: true
  },
  //控制密码显示
  handleEyeOpen() {
    this.setData({
      eyeOpen: !this.data.eyeOpen
    })
  },
  //设置手机号
  setPhone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  //设置密码
  setPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录
  toLogin(){
    let loginName = this.data.phone,
        password = this.data.password
    if(loginName === ''){
      dialog.showToast('请输入登录手机号码')
      return
    }else if(loginName.length !== 11){
      dialog.showToast('请输入正确的手机号码')
      return
    }else if(password === ''){
      dialog.showToast('请输入密码')
      return
    }
    app.post(`/base/login/portal/login`, { loginName, password},res=>{
      if(res.errorCode === 0){
        wx.setStorageSync('sessionid', res.body);
        dialog.showToast('登录成功','success');
        setTimeout(()=>{
          wx.navigateTo({
            url:'/pages/merchant/index/index'
          })
        },1000)
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  toRegister(){
    let portalUserType = wx.getStorageSync('portalUserType')
    if (portalUserType === 'STAFF'){
      dialog.showInfo('提示','该微信号已绑定个人账户，不能注册商家账户')
    }else{
      wx.navigateTo({
        url:'/pages/merchant/system/register/register'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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