// pages/merchant/problem/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textValue:'',
    phone:''
  },
//问题描述
problemDes: function(e){
  this.setData({
    textValue: e.detail.value
  })
  console.log(this.data.textValue)
},
//输入电话号码
phoneInput:function(e){
  this.setData({
    phone: e.detail.value
  })
   console.log(this.data.phone)
},

//提交给后台
  problemSub() {
    let params = {
      phone:this.data.phone,
      textValue: this.data.textValue
    }
    app.get(`/base/info/company`, params, res => {
      if (res.errorCode === 0) {
        this.setData({
          shopinfoList: res.body.rows
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