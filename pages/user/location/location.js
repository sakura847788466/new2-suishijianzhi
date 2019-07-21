// pages/user/location/location.js
const app = getApp(),
  dialog = require('../../../common/dialog.js')
Page({
  data: {
      
  },
  //初始化
  init(fn){
    this.setData({
      cityList: [],
      nowCity: null
    })
    this.getCityList();
    this.getNowCity();
    fn && fn()
  }, 
  //获取代理商列表
  getCityList(){
    app.getCityList((cityList)=>{
      this.setData({
        cityList
      })
    })
  },
  //获取当前城市
  getNowCity(){
    let currentCity = wx.getStorageSync('cityName')
    if (currentCity){
      this.setData({
        nowCity: currentCity
      })
    }else{
      app.getNowCity((name) => {
        this.setData({
          nowCity: name
        })
      })
    }
  },
  //跳转小程序
  chooseCity(e){
    let cityCode = e.currentTarget.dataset.citycode,
      cityName = e.currentTarget.dataset.cityname,
      isLocalSystem = e.currentTarget.dataset.islocalsystem,
      status = e.currentTarget.dataset.status,
      appid = e.currentTarget.dataset.appid;
    console.log(isLocalSystem, status)
    if (isLocalSystem){
      if(status){
        wx.setStorageSync('cityCode', cityCode)
        wx.setStorageSync('cityName', cityName)
        wx.reLaunch({
          url:'/pages/merchant/index/index'
        })
      }else{
        dialog.showInfo('提示','该城市还未开通')
      }
    }else{
      if(status){
        wx.navigateToMiniProgram({
          appId:appid
        })
      }else{
        dialog.showInfo('提示', '该城市还未开通')
      }
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