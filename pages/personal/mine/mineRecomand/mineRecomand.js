// pages/personal/mine/mineRecomand/mineRecomand.js
const app = getApp()
const getter = require('../../../../common/getUserInfo.js')
Page({
  getRecoCode(){
    let user = this.data.user
    if (!(user.qrCodeUrlSmall && user.inviteCode)) {
      let param = { isBigPic: false, isNeedRefresh: true }
      app.get(`/portal/user/getQRCode`, param, res => {
        if (res.body) {
          user.qrCodeUrlSmall = res.body
          wx.setStorageSync('user', user)
        }
      })
    }
    this.setData({
      showQRcode: true,
      inviteCode: user.inviteCode,
      qrCodeUrlSmall: user.qrCodeUrlSmall
    })
  },
  hideReco(){
    this.setData({
      showQRcode: false
    })
  },
  setInvitorCode(e){
    let code = e.detail.value
    if (/^[a-zA-Z\d]+$/.test(code) ){
      this.setData({
        inviterCode: code,
        ['user.inviterCode']: code
      })
      wx.setStorageSync('user', this.data.user)
      app.post(`/portal/user/setInfo`, { inviterCode: code }, res => {
        console.log(res)  //成功
      })
    } else {
      if (code){
        wx.showToast({
          title: '请输入正确的邀请码!',
          icon: 'none'
        })
      }
    }
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
    let user = wx.getStorageSync('user')
    this.setData({
      showQRcode: false,
      user,
      inviteList: user.inviteList,
      recomandNumber: user.inviteList.length,
      inviterCode: user.inviterCode ? user.inviterCode : '填写我的推荐码',      
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

  }
})