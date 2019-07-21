const app = getApp(),
  dialog = require('../../../../common/dialog.js'),
  apiHost = require('../../../../common/api_host.js');
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    userName: wx.getStorageSync('userName') ? wx.getStorageSync('userName') : '',
    loginPhone: wx.getStorageSync('loginPhone') ? wx.getStorageSync('loginPhone') : '',
    companyName:'',
    description:'',
    province: '',
    city: '',
    area: '',
    address: '',
    latitude: '',
    longitude: '',
    licenseUrl:'',
  },
  //提交审核
  toCheck(){
    let params = {
      userName: this.data.userName,
      companyName: this.data.companyName,
      description: this.data.description,
      province: this.data.province,
      city:this.data.city,
      area: this.data.area,
      address: this.data.address,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      licenseUrl: this.data.licenseUrl
    }
    if(params.userName === ''){
      dialog.showToast('联系人为空')
      return
    } else if (params.companyName === ''){
      dialog.showToast('商户名称为空')
      return
    } else if (params.province === '' || params.city === '' || params.area === '') {
      dialog.showToast('商户地址为空')
      return
    } else if (params.address === '') {
      dialog.showToast('详细地址为空')
      return
    } else if (params.licenseUrl === '') {
      dialog.showToast('请上传营业执照')
      return
    } 
    console.log(params)
    app.post(`/portal/user/setEmployerInfo`,params,res=>{
      if(res.errorCode === 0){
        dialog.showInfo('提示', '审核结果将通过短信方式发\n至您的手机号。', '确定', (res => {
          console.log(res)
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/merchant/index/index',
            })
          }
        }))
      }else{
        console.log(res)
        dialog.showToast(res.msg)
      }
    })
  },
  //设置联系人
  setUserName(e){
    this.setData({
      userName: e.detail.value
    })
  },
  //设置商户名称
  setCompanyName(e){
    this.setData({
      companyName:e.detail.value
    })
  },
  //设置商户简介
  setDescription(e){
    this.setData({
      description:e.detail.value
    })
  },
  //选择地址
  chooseLoaction(){
    let _this = this;
    wx.chooseLocation({
      success(res){
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
      fail(res){
        dialog.showToast('定位失败')
      }
    })
  },
  //上传图片
  upLoadImg: function (e) {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '上传中……',
        })
        wx.uploadFile({
          url: `${apiHost.config.portalApiHost}/v1/base/upload/upload_image`,
          filePath: res.tempFilePaths[0],
          header: {
            'content-type': 'multipart/form-data'
          },
          name: 'upfile',
          success: function (res) {
            let data = JSON.parse(res.data);
            dialog.showLoading('保存中……')
            if (data.errorCode === 0) {
              _this.setData({
                licenseUrl:data.body
              })
            } else {
              dialog.showToast(data.msg)
            }
          },
          fail: function (res) {

          },
          complete: function () {
            wx.hideLoading()
          }
        })
      }
    })
  },
  //获取当前登录信息
  getShopinfo() {
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
          headerImg: res.body.headerImg,
          userName: res.body.userName,
          loginPhone: res.body.loginPhone,
          companyName: res.body.employerUserInfo.companyName,
          province: res.body.province,
          city: res.body.city,
          area: res.body.area,
          address: res.body.address,
          latitude: res.body.latitude,
          longitude: res.body.longitude,
          description: res.body.employerUserInfo.description,
          licenseUrl: res.body.employerUserInfo.licenseUrl
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
    console.log(options)
    if (options.isAgain === '1'){//重新验证
      this.getShopinfo()
    }
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