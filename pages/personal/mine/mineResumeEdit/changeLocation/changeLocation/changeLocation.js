// pages/personal/mine/mineResumeEdit/changeLocation/changeLocation.js
Page({
  changeLocation(){
    // wx.navigateTo({
    //   url: './map/map',
    // })
    wx.chooseLocation({
      success:  (res) => { 
        this.setData({
          location: res.name,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
  },
  addressDetail(e){
    this.setData({
      address: e.detail.value
    })
  },
  save(){
    let user = wx.getStorageSync('user')
    user.address = this.data.location + this.data.address
    user.longitude = this.data.longitude
    user.latitude = this.data.latitude
    wx.setStorageSync('user', user)
  },
  /**
   * 页面的初始数据
   */
  data: {
    location: '点击选择',
    address: ''
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