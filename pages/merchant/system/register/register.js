const app = getApp(),
      dialog = require('../../../../common/dialog.js');
Page({
  data: {
    isAgrred: false,//同意条款
    isCode: true,
    codeTimer: null,
    second: 60,
    eyeOpen:true,
    eyeOpen_again:true,
    password:'',
    password_again:'',
    phone:'',
    code:''
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
  //设置验证码
  setCode(e){
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  getCode() {
    let phone = this.data.phone
    if(phone === ''){
      dialog.showToast('请输入手机号')
      return
    }else if(phone.length !== 11){
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
    app.get(`/base/sms_verify_code/get_binding_code`,{phone},res=>{
      if(res.errorCode === 0){
        
      } else if (res.errorCode !== 2){
        dialog.showToast(res.msg)
      }
    })
  },
  //控制密码显示
  handleEyeOpen () {
    this.setData({
      eyeOpen:!this.data.eyeOpen
    })
  },
  //控制密码显示(再次)
  handleEyeOpen_again() {
    this.setData({
      eyeOpen_again: !this.data.eyeOpen_again
    })
  },
  //设置密码
  setPassword(e){
    this.setData({
      password:e.detail.value
    })
  },
  //设置再次密码
  setPassword_again(e){
    this.setData({
      password_again: e.detail.value
    })
  },
  //注册
  toRegister(){
    let phone = this.data.phone,
        code = this.data.code,
        password = this.data.password,
        password_again = this.data.password_again;
    if(phone === ''){
      dialog.showToast('请输入手机号码')
      return
    }else if(phone.length !== 11){
      dialog.showToast('请输入正确的手机号码')
      return
    }else if(code === ''){
      dialog.showToast('请输入验证码')
      return
    }else if(password === ''){
      dialog.showToast('请输入密码')
      return
    }else if(password !== password_again){
      dialog.showToast('两次密码不相同')
      return
    } else if (!this.data.isAgrred){
      dialog.showToast('请阅读并同意服务条款')
      return
    }
    app.post(`/portal/user/bindPhoneAndPassword`,{phone,code,password},res=>{
      if(res.errorCode === 0){
        wx.setStorageSync('loginPhone', res.body.loginPhone)
        wx.setStorageSync('userName', res.body.userName)
        wx.setStorageSync('isBinding', true)
        wx.setStorageSync('portalUserType', 'EMPLOYER')
        wx.redirectTo({
          url: '/pages/merchant/system/registerInfo/registerInfo',
        })
      } else if (res.errorCode !== 2){
        dialog.showToast(res.msg)
      }
    })
  },

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