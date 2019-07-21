// pages/personal/mine/mineResumeEdit/changeLocation/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    city: '广州',
    // markers: [{
    //   id: 1,
    //   latitude: '',
    //   longitude: '',
    //   iconPath: '/image/locate.png',
    //   width: 30,
    //   height: 30
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getLocation({
    //   success: (res) => {
    //     this.setData({
    //       longitude: res.longitude,
    //       latitude: res.latitude,
    //       ['markers[0].latitude']: res.latitude,
    //       ['markers[0].longitude']: res.longitude
    //     })
    //   },
    // })
    wx.chooseLocation({
      success: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})