var app = getApp(),
  dialog = require('../../../common/dialog.js');
Page({
  data: {

  },
  //找工作
  searchJob () {
    wx.setStorageSync('role', '2')
    if (this.data.isBinding) {
      if (this.data.portalUserType === 'EMPLOYER'){
        dialog.showInfo('提示','您当前是商家账户')
      } else if (this.data.portalUserType === 'STAFF'){
        wx.switchTab({
          url: '/pages/personal/index/index'
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/personal/register/register'
      })
    }
    
  },
  //招人
  toRecruit () {
    wx.setStorageSync('role', '1')
    if (this.data.isBinding){
      if (this.data.portalUserType === 'EMPLOYER') {
        wx.navigateTo({
          url: '/pages/merchant/index/index'
        })
      } else if (this.data.portalUserType === 'STAFF') {
        wx.navigateTo({
          url: '/pages/merchant/system/login/login'
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/merchant/system/login/login'
      })
    }
  },
  //获取用户是否注册
  getUserInfo(){
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
          isBinding: res.body.isBinding
        })
        console.log(this.data.isBinding)
      }else if(res.errorCode === 2){
        app.getWxInfo();
      }
    })
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
    this.setData({
      isBinding: wx.getStorageSync('isBinding'),
      portalUserType: wx.getStorageSync('portalUserType')
    })
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