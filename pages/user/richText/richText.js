const app = getApp(),
  dialog = require('../../../common/dialog.js'),
  apiHost = require('../../../common/api_host.js'),
  WxParse = require('../../../wxParse/wxParse.js')
  // type:1:为轮播图；2：为专业地推 3:批量兼职
Page({
  data: {
    
  },
  //获取页面显示内容
  getDetail(type) {
    if (type === '1') {
      wx.setNavigationBarTitle({
        title: '随时兼职',
      })
      app.get('/base/banner/get', { id: this.options.id }, res => {
        if (res.errorCode === 0) {
          WxParse.wxParse('article_content', 'html', res.body.des, this)
        } else if (res.errorCode !== 2) {
          dialog.showToast(res.msg);
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    } else if (type === '2') {
      wx.setNavigationBarTitle({
        title: '专业地推',
      })
      app.get('/base/config/get_zhuan_ye_di_tui', {}, res => {
        if (res.errorCode === 0) {
          WxParse.wxParse('article_content', 'html', res.body.value, this)
        } else if (res.errorCode !== 2) {
          dialog.showToast(res.msg);
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }else if(type === '3'){
      wx.setNavigationBarTitle({
        title: '批量兼职',
      })
      app.get('/base/config/get_batch_job', {}, res => {
        if (res.errorCode === 0) {
          WxParse.wxParse('article_content', 'html', res.body.value, this)
        } else if (res.errorCode !== 2) {
          dialog.showToast(res.msg);
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    } else {
      dialog.showToast('系统出错')
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
      return
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.type)
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