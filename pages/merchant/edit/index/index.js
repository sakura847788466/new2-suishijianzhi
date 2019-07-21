const app = getApp(),
  dialog = require('../../../../common/dialog.js'),
  apiHost = require('../../../../common/api_host.js');
Page({
  data: {
    isBack:false,
    backgroundImg:[]
  },
  //跳转修改手机号码
  toChangePhone() {
    wx.navigateTo({
      url: '/pages/merchant/edit/phone/phone?oldPhone=' + this.data.loginPhone,
    })
    this.setData({
      isBack:true
    })
  },
  //获取个人信息
  getShopinfo() {
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        let backgroundImg = res.body.backgroundImg.split(',')
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
          backgroundImg
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //重新认证
  aginRegister(){
    dialog.showModal('提示','修改需要重新认证，确定修改？',res=>{
      if(res.confirm){
        wx.navigateTo({
          url: '/pages/merchant/system/registerInfo/registerInfo?isAgain=1',
        })
      }
    })
  },
  //地址
  location(){
    dialog.showModal2('提示', '您是要查看地址还是修改地址？','查看','修改', res => {
      console.log(res)
      if (res.confirm) {//查看
        this.toMap()
      }
      if (res.cancel){//修改
        this.aginRegister()
      }
    })
  },
  //查看地图
  toMap() {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 18,
      name: this.data.address,
      address: this.data.province + this.data.city + this.data.area + this.data.address,
    })
  },
  //跳转编辑商家概况
  toSetDescription(){
    wx.navigateTo({
      url: '/pages/merchant/edit/description/description?id=' + this.options.id,
    })
  },
  //上传图片
  upLoadImg: function (e) {
    let _this = this;
    app.upLoadImg(1,(imgList)=>{
      this.editHeaderImg(imgList[0])
    })
  },
  //预览图片
  prevImg(e){
    let current = e.currentTarget.dataset.url
    app.previewImage(current, this.data.backgroundImg)
  },
  //修改头像
  editHeaderImg(value){
    app.post(`/portal/user/setEmployerInfo`, { headerImg:value}, res => {
      if (res.errorCode === 0) {
        this.setData({
          headerImg: value
        })
      } else {
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转设置商家图片
  toSetBgImg(){
    wx.navigateTo({
      url: '/pages/merchant/edit/bgImg/bgImg',
    })
    this.setData({
      isBack: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopinfo();
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
    if(this.data.isBack){
      this.getShopinfo()
      this.setData({
        isBack:false
      })
    }
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