// pages/merchant/moneyCash/moneyCash.js
 const app =getApp()
 const dialog = require('../../../../common/dialog.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:[],
      userMoney:'',
      moneyT:''
  },
  //先要获取账户余额（可提现余额）
  money() {
    let parms = {

    }
    app.get(`/portal/accounts`, parms, res => {
      if (res.errorCode === 0) {
        console.log(res)
        this.setData({
          moneyT: res.body.accountBalance
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //全部提现
  pushCash(){
    const _this = this
    wx.showModal({
      title: '确定全部提现?',
      success(res){
        if(res.confirm){
          _this.getMoney(_this.data.moneyT)
        }
      }
    })

  },
  //获取提现金额作为参数
  moneyInput: function (e) {
    this.setData({
      userMoney: e.detail.value
    })
  },
  //提现申请是否成功跳转
  test() {
    wx.navigateTo({
      url: '/pages/user/message/success/success?type=4&money=9',
    })
  },
  //提现申请
  getMoney(e) {
    console.log(e)
    let params = {
      cashAmount: e !==undefined ? e : this.data.userMoney
    }
    app.get(`/portal/cashApply/create`, params, res => {
      if (res.errorCode === 0) {
        this.setData({
          money: res.body
        })
        wx.showToast({
          title: '提现成功',
        })
      } else if (res.errorCode !== 2 && res.msg =="余额不足") {
        //  dialog.showToast(res.msg)
         this.test()
      } 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // this.getMoney();
    this.money();
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