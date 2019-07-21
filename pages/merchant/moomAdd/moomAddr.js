// pages/merchant/moomAdd/moomAddr.js
const app = getApp();
const getter = require('../../../common/getUserInfo.js')
Page({
  dateChange(e) {
    let date = e.detail.value
    date = date.split('-')
    let setYear = date[0]
    let setMonth = date[1]
    date = setYear + '年' + setMonth + '月'
    this.setData({
      date
    })
    console.log(date.split('-'))
  },
  comfirmBtn(){
    this.setData({
      cashOutSuccess: false,
      cashIsComing: true
    })
  },
  //申请工作时长奖励
  getReward() {
    app.get(`/portal/user/getReward`, {}, res => {
      if (res.errorCode === 0){
        this.setData({
          cashOutSuccess: true
        })
      } else{
        wx.showToast({
          title: '申请失败',
          icon: 'none'
        })
      }
    })
  },
  cannotGetReward(){
    wx.showToast({
      title: '时长还未满50小时哦!',
      icon: 'none'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    date: '2019年03月',
    cashOutSuccess: false,
    cashIsComing: false,
    hasGotReward: false,
    previous: false
  },
  getWorkTimeLong() {
    getter.getUserInfomation(this, () => {
      const workTimeLong = this.data.user.employeeMonthStatistics.workTimeLong
      this.setData({
        workTimeLong
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWorkTimeLong()
    let now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    const endDate = year + '-' + month
    this.setData({
      endDate
    })
    this.getWorkTimeLong
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