// pages/personal/mine/mineResumeEdit/certificationAdd/certificationAdd.js
Page({
  inputBlur (e) {
    let val = e.detail.value
    if (val) {
      this.setData({
        ['annexs.name']: val
      })
    }
  },
  uploadFile () {
    let self = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        app.uploadMyFlie(tempFilePaths, (url) => {
          self.setData({
            ['annexs.url']: url
          })
        })
      },
    })
  },
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  save () {
    let annexs = this.data.annexs
    if ((annexs.name !== '请填写，例如法人身份证') && (annexs.url !== '/image/add.png')){
      wx.navigateTo({
        url: '../mineResumeEdit?name=' + annexs.name + '&url=' + annexs.url,
      })
    } else {
      wx.showToast({
        title: '请完整填写信息!',
        icon: 'none'
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    annexs: { name: '请填写，例如法人身份证', url: '/image/add.png'}
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

  }
})