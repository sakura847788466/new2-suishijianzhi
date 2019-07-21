const app = getApp(),
  dialog = require('../../../../common/dialog.js'),
  apiHost = require('../../../../common/api_host.js')
Page({
  data: {

  },
  //初始化
  init(fn) {
    this.setData({
      pageNum: 0,
      pageSize: 20,
      totalPage: 0,
      merList:[]
    })
    this.getMerchants()
    fn && fn()
  },
  //获取商家
  getMerchants(n) {
    if (n === 0) {
      this.setData({
        pageNum: 0,
        totalPage: 0,
        merList: [],
      })
    }
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    app.get(`/base/info/company`, params, res => {
      if (res.errorCode === 0) {
        let merList = res.body.rows
        this.setData({
          merList: this.data.merList.concat(merList),
          totalPage: res.body.totalPage
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转商家详情页
  toMerchantDetail(e){
    wx.navigateTo({
      url: '/pages/merchant/detail/merchantDetail/merchantDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    if (this.data.pageNum < this.data.totalPage - 1) {
      this.setData({
        pageNum: this.data.pageNum + 1
      }, () => {
        this.getMerchants()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})