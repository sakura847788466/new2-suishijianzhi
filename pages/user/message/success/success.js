Page({
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // type => 1:充值成功；2：充值失败；3：提现成功；4：提现失败
    let type = options.type;
    let money = options.money || 0.00;
    let msgData = {
      isSuc: false,
      text: '操作失败',
      subText: '系统出错，请重新操作！',
      button: [{
        btnText: '返回',
        btnUrl: '-1'
      }]
    }
    switch(type){
      case '1':
        msgData = {
          isSuc: true,
          text: '充值成功',
          subText: `恭喜您，成功充值${money}元！`,
          button: [{
            btnText: '继续充值',
            btnUrl: '-1'
          }, {
              btnText: '我的钱包',
              btnUrl: '/pages/merchant/money/index/index'
            }]
        }
        break;
      case '2':
        msgData = {
          isSuc: false,
          text: '充值失败',
          subText: `充值遇到问题，请尝试重新充值`,
          button: [{
            btnText: '重新充值',
            btnUrl: '-1'
          }, {
            btnText: '我的钱包',
            btnUrl: '/pages/merchant/money/index/index'
          }]
        }
        break;
      case '3':
        msgData = {
          isSuc: true,
          text: '提现申请成功',
          subText: `系统审核成功后将转到您绑定的微信账号中，\n请注意查看系统消息`,
          button: [{
            btnText: '继续提现',
            btnUrl: '-1'
          }, {
            btnText: '我的钱包',
            btnUrl: '/pages/merchant/money/index/index'
          }]
        }
        break;
      case '4':
        msgData = {
          isSuc: false,
          text: '提现申请失败',
          subText: `提现申请遇到问题，请尝试重新申请`,
          button: [{
            btnText: '重新申请',
            btnUrl: '-1'
          }, {
            btnText: '我的钱包',
            btnUrl: '/pages/merchant/money/index/index'
          }]
        }
        break;
    }
    this.setData({
      msgData,
    })
  },
  //点击按钮
  handleClick (e){
    let btnUrl = e.currentTarget.dataset.url;
    if(btnUrl === '-1'){
      wx.navigateBack({
        delta:1
      })
    }else{
      wx.navigateTo({
        url: btnUrl,
      })
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