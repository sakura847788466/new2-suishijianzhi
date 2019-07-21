const app = getApp(),
  dialog = require('../../../common/dialog.js'),
  apiHost = require('../../../common/api_host.js')
Page({
  data: {
    role:'2',
    isLogin:false
  },
  //初始化
  init(fn){
    this.setData({
      pageNum: 0,
      pageSize: 15,
      totalPage: 0,
      jobList: [],
    })
    this.getJobs()
    fn && fn()
  },
  //获取推荐兼职
  //获取列表
  getJobs(n) {
    if (n === 0) {
      this.setData({
        pageNum: 0,
        totalPage: 0,
        jobList: [],
      })
    }
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      isLogin: this.data.isLogin,
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude')
    }
    app.get(`/portal/jobs/recommendJob`, params, res => {
      if (res.errorCode === 0) {
        let jobList = res.body.rows
        this.setData({
          jobList: this.data.jobList.concat(jobList),
          totalPage: res.body.totalPage
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转消息列表页
  toMsgList(){
    wx.navigateTo({
      url: '/pages/user/msgList/msgList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.isLogin((res)=>{
      if(res.errorCode === 0){
        this.setData({
          isLogin:true
        })
      }
      this.init()
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
    if (this.data.pageNum < this.data.totalPage - 1) {
      this.setData({
        pageNum: this.data.pageNum + 1
      }, () => {
        this.getJobs()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})