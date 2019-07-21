const app = getApp(),
  dialog = require('../../../../common/dialog.js');
Page({
  data: {

  },
  //初始化
  init(fn){
    this.setData({
      staffList:[]
    })
    this.getStaffList()
    fn && fn()
  },
  //获取员工列表
  getStaffList(){
    let _this = this;
    let id = this.options.id
    app.get(`/portal/jobs/${id}`, { id }, res => {
      if (res.errorCode === 0) {
        this.setData({
          jobStatus: res.body.jobStatus,
          staffList: res.body.jobApplyList
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //录用员工
  luyong(e){
    let id = e.currentTarget.dataset.id
    let jobStatus = this.data.jobStatus
    if (jobStatus === 'unpay'){
      dialog.showModal2('未支付保证金！','只有成功支付兼职的保证金，您才能录用抢单成功的员工。','去支付','再想想',res=>{
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/merchant/recruit/payDeposit/payDeposit?id=' + this.options.id,
          })
        }
      })
    }else{
      app.get(`/portal/jobsApply/confirm/${id}`, { id }, res => {

      })
    }
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})