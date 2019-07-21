const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    backgroundImg:[]
  },
  //获取个人信息
  getShopinfo() {
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
            backgroundImg: res.body.backgroundImg.split(',')
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //设置商家图片
  addImg() {
    let backgroundImg = this.data.backgroundImg
    app.upLoadImg(4 - backgroundImg.length, (imgList) => {
      backgroundImg = backgroundImg.concat(imgList)
      this.setData({
        backgroundImg
      })
    })
  },
  //取消图片
  cancelImg(e){
    let index = e.currentTarget.dataset.index
    let backgroundImg = this.data.backgroundImg
    backgroundImg.splice(index,1)
    this.setData({
      backgroundImg
    })
  },
  //预览图片
  prevImg(e) {
    let current = e.currentTarget.dataset.url
    app.previewImage(current, this.data.backgroundImg)
  },
  //保存
  save(){
    let backgroundImg = this.data.backgroundImg.join(',')
    if (backgroundImg){
      app.post(`/portal/user/setEmployerInfo`, { backgroundImg }, res => {
        if (res.errorCode === 0) {
          dialog.showToast('保存成功', 'success')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }else{
      dialog.showToast('请上传图片')
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopinfo()
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