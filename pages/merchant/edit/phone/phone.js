const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    isCode: true,
    codeTimer: null,
    second: 60,
    isNew:false,
    newPhone:'',
    code:''
  },
  //设置新联系方式
  setNewPhone(e){
    this.setData({
      newPhone: e.detail.value
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
    let phone = ''
    if(this.data.isNew){
      phone = this.data.newPhone
    }else{
      phone = this.data.oldPhone
    }
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
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //下一步：判断是否本人手机
  nextStep(){
    let phone = this.data.oldPhone,
        code = this.data.code
    if(code === ''){
      dialog.showToast('请输入验证码')
      return
    }
    let params = {
      phone,
      code,
    }
    app.post(`/base/sms_verify_code/check_change_code`,params,res=>{
      if(res.errorCode === 0){
        clearInterval(this.data.secondTimer)
        this.setData({
          secondTimer: null,
          isCode: true,
          second: 60,
          isNew: true,
          code:''
        })
      }else{
        dialog.showToast(res.msg)
      }
    })
  },
  //保存：修改联系方式
  save(){
    let phone = this.data.newPhone,
      code = this.data.code
    if (phone === '') {
      dialog.showToast('请输入手机号')
      return
    } else if (phone.length !== 11) {
      dialog.showToast('请输入正确的手机号码')
      return
    }else if (code === '') {
      dialog.showToast('请输入验证码')
      return
    }
    let params = {
      phone,
      code,
    }
    app.post(`/portal/user/changePhone`,params,res=>{
      if(res.errorCode === 0){
        dialog.showToast('修改成功','success')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
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
  onLoad: function (options) {
    this.setData({
      oldPhone:this.options.oldPhone
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