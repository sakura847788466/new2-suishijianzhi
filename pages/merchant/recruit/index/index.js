const app = getApp(),
    dialog = require('../../../../common/dialog.js');
Page({
  data: {
    
  },
  //初始化
  init(fn){
    this.setData({
      pageNum: 0,
      pageSize: 15,
      totalPage: 0,
      jobList: [],
      jobStatus:''
    })
    this.getJobs()
    fn && fn()
  },
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
      userId: this.data.userId,
      jobStatus: this.data.jobStatus
    }
    app.get(`/portal/jobs/list`, params, res => {
      if (res.errorCode === 0) {
        let jobList = res.body.rows
        jobList.map(item=>{
          item.jobStatus = app.transformationStr(item.jobStatus)
        })
        this.setData({
          jobList: this.data.jobList.concat(jobList),
          totalPage: res.body.totalPage
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转职位详情页
  toJobDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/merchant/detail/jobDetail/jobDetail?id=' + id,
    })
  },
  //选择分类
  handleClassify:function(e){
    let jobStatus = e.currentTarget.dataset.status;
    this.setData({
      jobStatus,
    },()=>{
      this.getJobs(0)
    })
  },
  //挑选员工
  toCheckStaff(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/merchant/recruit/checkWorker/checkWorker?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.isLogin((res)=>{
      if(res.errorCode === 0){
        this.setData({
          userId:res.body.id
        })
        this.init()
      }
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