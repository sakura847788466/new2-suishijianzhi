// pages/personal/mine/mineResume/mineResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:[
      { job: '服务员', time: '1年3个月' },
      { job: '派单员', time: '2年3个月' },
      { job: '门店服装导购员', time: '8个月' }          
    ],
    certificate: [
      { name: '英语四级', pic: '/image/2.png' },
      { name: '英语四级', pic: '/image/2.png' },
      { name: '英语四级', pic: '/image/2.png' },
      { name: '英语四级', pic: '/image/2.png' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('user')
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
    const user = wx.getStorageSync('user')
    const now = new Date()
    const birth = new Date(user.birth)
    this.setData({
      age: now.getFullYear() - birth.getFullYear()
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