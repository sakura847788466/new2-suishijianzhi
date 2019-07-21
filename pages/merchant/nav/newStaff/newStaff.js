// pages/merchant/latestStaff/latestStaff.js
const app = getApp(),
      dialog = require('../../../../common/dialog.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workerList:[],
    pageNum:0,
    pageSize:15,
    newStaffs:0,
  },
  //获取最新员工列表
  getWorker() {
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    app.get(`/base/info/user`, params, res => {
      if (res.errorCode === 0) {
        let workerList = res.body.rows
        workerList.map(item=>{
          item.gender = item.gender === 'WOMEN' ? '女' : item.gender == 'MEN' ? '男' : '未知'
        })
        this.setData({
          workerList: this.data.workerList.concat(workerList),
          totalPage: res.body.totalPage
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转员工简历页
  toStaffDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/personal/mine/mineResume/mineResume?id='+id,
    })
  },
  //获取本月新增员工
  getNewStaffs(){
    app.get(`/base/info/newUserNum`,{},res=>{
      if(res.errorCode === 0){
        this.setData({
          newStaffs:res.body
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.getWorker();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.stars = this.selectComponent("#stars");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageNum < this.data.totalPage -1){
      this.setData({
        pageNum: this.data.pageNum + 1
      },()=>{
        this.getWorker()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})