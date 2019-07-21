// pages/merchant/setWhere/setWhere.js
const app =getApp();
const apiHost = require('../../../common/api_host.js');
const dialog = require('../../../common/dialog.js')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description: '',
    province: '',
    city: '',
    area: '',
    address: '',
    latitude: '',
    longitude: '',
    licenseUrl: '',
  },
  //获取当前城市（本地存储）
   getNowcity:function(){
     var that = this;
     wx.getStorage({
       key: 'cityName',
       success: function(res) {
         that.setData({
           nowCity:res.data
         })
       },
     })
   }, 
  //选择地址
  chooseLoaction() {
    let _this = this;
    wx.chooseLocation({
      success(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let address = res.name
        _this.setData({
          latitude,
          longitude,
          address,
        })
        qqmapsdk = new QQMapWX({
          key: 'EWHBZ-UKQKX-NYX4U-TAHAH-VHMYV-GVBNF'
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: function (r, data) {
            let location = r.result.address_component
            let province = location.province
            let city = location.city
            let area = location.district
            _this.setData({
              province,
              city,
              area
            })
          }
        })
      },
      fail(res) {
        dialog.showToast('定位失败')
      }
    })
  },

  //点击保存
  clickSave:function(){
      let params = {
          province: this.data.province,
          city: this.data.city,
          area: this.data.area,
          address: this.data.address,
      }
      console.log(params)
      app.post(`/portal/user/setEmployerInfo`, params, res => {
        if (res.errorCode === 0) {
          console.log(res)
          this.setData({
            
          })
          wx.reLaunch({
            url: '/pages/merchant/shopsetHead/sopsetHead',
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