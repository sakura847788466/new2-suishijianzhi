const app = getApp(),
  dialog = require('../../../common/dialog.js');
Page({
  data: {
    
  },
  //热门搜索列表
  getHotList(){
    app.get(`/base/jobType/list`, {}, res => {
      if (res.errorCode === 0) {
        let jobType = res.body.rows
        let newJobType = jobType.filter((item,index)=>{
          return index < 10
        })
        this.setData({
          jobType: newJobType
        })
      }
    })
  },
  //选择
  chooseJobType(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user/job/all/all?jobtype='+id,
    })
  },
  //搜索
  setTitle(e){
    this.setData({
      title: e.detail.value
    })
  },
  
  //确定
  toTrue(){
    let title = this.data.title
    // if(title === ''){
    //   dialog.showToast('搜索内容为空')
    //   return
    // }
    wx.navigateTo({
      url: '/pages/user/job/all/all?title=' + title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title
    })
    this.getHotList()
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