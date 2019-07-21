const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
      
  },
  //初始化
  init(fn){
    this.setData({
      pageNum: 0,
      pageSize: 15,
      totalPage: 0,
      jobList:[],
    })
    this.getCurrentInfo()
    this.getDetail()
    this.getJobs()
    fn && fn()
  },
  //获取商家详情
  getDetail(){
    app.get(`/portal/user/getStaffDetail`, { userId:this.options.id},res=>{
      if(res.errorCode === 0){
        let detail = res.body
        detail.backgroundImg = detail.backgroundImg ? detail.backgroundImg.split(',') : ['/image/banner.png']
        detail.headerImg = detail.headerImg ? detail.headerImg : ''
        this.setData({
          detail
        })
      }else{
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转编辑页
  toEdit(){
    wx.navigateTo({
      url: '/pages/merchant/edit/index/index?id=' + this.options.id,
    })
  },
  //获取在招职位
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
      userId:this.options.id,
      jobStatus: 'unpay,onShelf'
    }
    app.get(`/portal/jobs/list`, params, res => {
      if (res.errorCode === 0) {
        let jobList = res.body.rows
        jobList.map(item => {
          item.distance = (item.distance / 1000000).toFixed(1)
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
  //跳转兼职详情页
  toJobDetail(e) {
    app.isLogin((res) => {
      if (res.errorCode === 0) {
        wx.navigateTo({
          url: '/pages/merchant/detail/jobDetail/jobDetail?id=' + e.currentTarget.dataset.id,
        })
      }
    })
  },
  //获取当前登录信息
  getCurrentInfo() {
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
          currentUserId: res.body.id
        })
      }
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