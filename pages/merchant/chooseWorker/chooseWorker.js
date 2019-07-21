// pages/merchant/chooseWorker/chooseWorker.js
const app = getApp();
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
      status:false,
      pageNum:"0",
      pageSize:"10"
  },
   //点击选中
    click :function(e){
      console.log(e.currentTarget.dataset.status)
      var status = e.currentTarget.dataset.status
        this.setData({
            status:this.data.status

        })
        console.log(this.data.status)
    },


    //获取最新员工
  getWorker() {
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    app.get(`/base/info/user`, params, res => {
      if (res.errorCode === 0) {
        let workerList = res.body.rows
        workerList.map(item => {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWorker();
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