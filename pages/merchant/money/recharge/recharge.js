// pages/merchant/recharge/recharge.js
const app =getApp();
//  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    nonceStr:'',
    package:'',
    paySign:'',
    signType:'',
    timestamp:'',
    userMoney:'',
    moneyList:'',
    moneyInfo:''


  },
  test(){
    wx.navigateTo({
      url: '/pages/user/message/success/success?type=1&money=9',
    })
  },
//获取金钱参数
  moneyInput: function (e) {
    this.setData({
      userMoney: e.detail.value
    })
  },


  //将金钱参数传后台支付接口数据，实现支付
  getMoney() {

    let parms ={
        recharge:this.data.userMoney
    }
    app.post(`/portal/order/pay/prepay_recharge`, parms, res => {
      if (res.errorCode === 0) {
        this.setData({
          timeStamp: res.body.jssdkPayConfig.timestamp,
          nonceStr: res.body.jssdkPayConfig.nonceStr,
          package: res.body.jssdkPayConfig.package,
          paySign: res.body.jssdkPayConfig.paySign,
        })
      } else if (res.errorCode !== 2) {
          dialog.showToast(res.msg)
      }
    })
  },
  //调用支付
  zhifu(){
    this.getMoney();
  
    wx.requestPayment(
      {
        'timeStamp': this.data.timeStamp,
        'nonceStr': this.data.nonceStr,
        'package': this.data.package,
        'signType': 'MD5',
        'paySign': this.data.paySign,
        'success': function (res) {
              wx.navigateTo({
                url: '/pages/user/message/success/success?type=1&money=' + recharge,
                //充值成功
              })
         },
        'fail': function (res) { 
          
        },
        'complete': function (res) { }
      })
  },

 //时间戳函数
  createTimeStamp: function () {
    return parseInt(new Date().getTime() / 1000) + ''
  },
     
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      moneyInfo:options.money
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