// pages/merchant/zhiweimiaoshu/zhiweimiaoshu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    max: 400,
    value:'',
    textValue:'',
    miaoshu:''
  },
 // 获取文本框的内容
 
  //字数控制
  limit: function (e) {
    var value = e.detail.value;
    console.log(value)
    var length = parseInt(value.length);
     console.log(length)
    if (length > this.data.noteMaxLen) {
      return;//终止setData的执行
    }

    this.setData({
      current: length,
      textValue:value
    });
  },
//兼职描述
  miaoshu: function (e) {
    this.setData({
      miaoshu: e.detail.value
    })
    console.log(this.data.miaoshu)
  },


  //将文本内容发送给后台
  push:function(e){
    var value = e.detail.value
     let that = this;
     let params ={
       
     }
     //不使用本地存储，占用资源
     
    // wx.setStorage({//本地存储

    //   key: 'des',
    //   data: 222,
    //   success: function(res) {
    //     console.log(res)
    //     wx.reLaunch({
    //       url: '/pages/merchant/post/post?text='+that.data.textValue
    //     })
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},

    // })

    //提交给后台 接口未找到
      app.get(`/base/jobType/list`, params, res => {
        if (res.errorCode === 0) {
          this.setData({
            worker: res.body.rows,
            jobTypeId: res.body.rows
          })
          console.log(this.data.worker)
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