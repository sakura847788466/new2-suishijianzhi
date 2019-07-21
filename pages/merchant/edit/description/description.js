const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    curLen: 0,
    maxLen: 400,
    description: ''
  },
  //设置内容
  setDescription: function (e) {
    let value = e.detail.value
    let curLen = value.length
    this.setData({
      curLen,
      description:value
    });
  },
  //保存
  save(){
    app.post(`/portal/user/setEmployerInfo`, { description: this.data.description},res=>{
      if(res.errorCode === 0){
        dialog.showToast('保存成功','success')
        setTimeout(()=>{
          wx.navigateBack({
            delta:1
          })
        },1000)
      }
    })
  },
  //获取内容
  getDescription(){
    app.get(`/portal/user/get`, {}, res => {
      if (res.errorCode === 0) {
        let description = res.body.employerUserInfo.description
        this.setData({
          description,
          curLen: description.length
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
    if(options.id){
      this.getDescription()
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