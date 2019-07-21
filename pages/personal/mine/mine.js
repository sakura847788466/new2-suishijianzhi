// pages/personal/mine/mine.js
const app = getApp(),
      dialog = require('../../../common/dialog.js');
const getter = require('../../../common/getUserInfo.js')
Page({
  /**
   * 页面的初始数据
   */
  logout() {
    app.post(`/base/login/portal/logout`, {}, (res) => {
      if(res.errorCode === 0){
        dialog.showToast('退出成功')
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/user/userSelect/userSelect',
          })
        },1000)
      }
    })
  },
  //跳转我的钱包
  toMinePurse() {
    wx.navigateTo({
      url: './minePurse/minePurse',
    })
  },
  //跳转本月累计时长
  toAddMoom(){
    wx.navigateTo({
      url: '/pages/merchant/moomAdd/moomAddr',
    })
  },
  data: {
    user: {
      username: 'sususu',
      avatar: '/image/mine-selfie.png',
      accountBalance: '0.00',
      howLong: '46',
      phone: ''
    }
  },
  //联系客服
  toContact() {
    wx.makePhoneCall({
      phoneNumber: '88888888'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    getter.getUserInfomation(this, () => {
      let workTimeLong = parseFloat((this.data.user.employeeMonthStatistics.workTimeLong) / 60).toFixed(1)
      this.setData({
        workTimeLong
      })
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