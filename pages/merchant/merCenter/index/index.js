const app = getApp();
const dialog = require("../../../../common/dialog.js")
Page({
  data: {
    merList:[],
    phoneNum:[],
    backgroundImg:[],
    id:''
  },
//获取商家的信息
  getBossinfo() {

    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
          merList: res.body.userName,
          phoneNum: res.body.loginPhone,
          backgroundImg: res.body.backgroundImg,
          id:res.body.id
        })
        console.log(res.body.id)

      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转到商家简介带参数
  toDetail: function (event) {//参数：事件对象
    console.log(event);
    wx.navigateTo({
      url: 'pages/merchant/detail/merchantDetail/merchantDetail?id=' +        event.currentTarget.id,/**url传参*/
    })
  },
  //联系客服
  toContact(){
    wx.makePhoneCall({
      phoneNumber:'88888888'
    })
  },

  //退出登录
  logout() {
    app.post(`/base/login/wx/logout`, {}, res => {
      if (res.errorCode === 0) {
        dialog.showToast("退出成功")
        wx.navigateTo({
          url: '/pages/user/userSelect/userSelect',
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
      this.getBossinfo();
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