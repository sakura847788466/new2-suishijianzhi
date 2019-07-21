const app =getApp();
const dialog = require('../../../common/dialog.js')
Page({
  data: {
    pageNum:0,
    pageSize:10,
    totalPage:0,
    mesg:[],
    id:'',
    nowTime:'',
    msgType:'jobMsg',//假设type1:工作信息 2：系统通知

  },
  //初始化   必须要初始化
  init(fn) {
    this.setData({
      currentTab: '0',
    })
    this.getMesg()
    fn && fn()
  },
  //tab切换
  clickTab:function(e){
    let msgType = e.currentTarget.dataset.msgtype
    this.setData({
      msgType
    }, () => {
      this.getMesg(0);      
    })
  },
//获取商家的信息
  getMesg(n) {
    if(n === 0){
      this.setData({
        pageNum: 0,
        totalPage: 0,
        mesg: [],
      })
    }
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      msgType: this.data.msgType
    }
    app.get(`/portal/sysmsgs`, params, res => {
      if (res.errorCode === 0) {
        let mesg = res.body.rows
        mesg.map(item=>{
          item.createdTime = app.transformTimes(item.createdTime)
        })
        this.setData({
          mesg: this.data.mesg.concat(mesg),
          totalPage: res.body.totalPage
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转信息详情
  toMsgDetail(e){
    let msgBizType = e.currentTarget.dataset.type,
        bizId = e.currentTarget.dataset.id,
        path = '',
        role = wx.getStorageSync('role')
    if(role === '1'){
      switch (msgBizType) {
        case 'jobApply':
          path = `/pages/merchant/detail/jobDetail/jobDetail?id=${bizId}`
          break
        case 'jobAudit':
          path = `/pages/merchant/recruit/payDeposit/payDeposit?id=${bizId}`
          break
      }
    }else{

    }
    if(path){
      wx.navigateTo({
        url: path,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
        this.getMesg()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})