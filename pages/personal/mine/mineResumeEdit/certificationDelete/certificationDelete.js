// pages/personal/mine/mineResumeEdit/certificationDelete/certificationDelete.js
const app = getApp()
Page({
  changeImage(){
    const self = this
    wx.chooseImage({
      count: 1,     
      success: function(res) {
        const tempFilePaths = res.tempFilePaths[0]
        app.uploadMyFlie(tempFilePaths, (url) => {
          self.setData({
              url
          })
        })
      },
    })
  },
  inputBlur(e){
    this.setData({
      name: e.detail.value
    })
  },
  save(){
    wx.setStorageSync('changeItem', { id: this.data.id, name: this.data.name, url: this.data.url })
    wx.showToast({
      title: '保存成功!',
    })
  },
  deleteAnnex () {
    const _this = this
    wx.showModal({
      title: '确定要删除?',
      success(res){
        if(res.confirm){
          wx.setStorageSync('deleteAnnex', _this.data.id)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      url: options.url,
      id: options.id
    })
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