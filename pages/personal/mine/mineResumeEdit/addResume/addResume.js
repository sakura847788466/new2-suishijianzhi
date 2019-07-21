// pages/personal/mine/mineResumeEdit/addResume/addResume.js
Page({
  selectJob(){
    wx.navigateTo({
      url: './selectJob/selectJob',
    })
  },
  yearSet(e) {
    let year = e.detail.value > 0 ? e.detail.value : 0
    this.setData({
      year: year
    })
  },
  monthSet(e) {
    this.setData({
      month: e.detail.value
    })
  },
  save(){
    wx.removeStorageSync('selectJobId')
    wx.removeStorageSync('jobName')    
    if (this.data.selectJobId && ( this.data.year || this.data.month )){
      let workLong = (parseInt(this.data.year)) * 12 + parseInt(this.data.month)
      wx.navigateTo({
        url: '../mineResumeEdit?jobTypeId=' + this.data.selectJobId + '&workLong=' + workLong + '&year=' + this.data.year + '&month=' + this.data.month + '&jobName=' + this.data.jobName
      })
    } else {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none'
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    jobName: '请选择职位',
    year: 0
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
    const selectJobId = wx.getStorageSync('selectJobId')
    const jobName = wx.getStorageSync('jobName')
    if (selectJobId && jobName){
      this.setData({
        selectJobId,
        jobName
      })
    }
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