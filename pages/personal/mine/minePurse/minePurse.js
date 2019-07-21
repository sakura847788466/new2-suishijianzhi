// pages/personal/mine/minePurse/minePurse.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      { title: '提现', image: '/image/withdraw.png', url: '' }
    ],
    // transaction: [
    //   { name: '三月累计时长奖励', time1: '2018-04-05', time2: '00:00:00', change: '+2.00'},
    //   { name: '三月累计时长奖励', time1: '2018-04-05', time2: '00:00:00', change: '+2.00' },
    //   { name: '三月累计时长奖励', time1: '2018-04-05', time2: '00:00:00', change: '+2.00' },
    //   { name: '三月累计时长奖励', time1: '2018-04-05', time2: '00:00:00', change: '+2.00' },
    //   { name: '三月累计时长奖励', time1: '2018-04-05', time2: '00:00:00', change: '+2.00' }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // '{enum: work_income(工作收入), work_time_reward(工作时长累计奖励), invite_reward(邀请奖励), recharge(充值), publish_work(发布工作) , clear(工作结算), cash_apply(提现)}'
  onLoad: function (options) {

    this.setData({
      user: wx.getStorageSync('user'),
    })
    let user = this.data.user
    let param = { pageNum: 1, pageSize: 5 }
    app.get('/portal/accounts/list', param, res => {
      let rows = res.body.rows
      let transaction = []
      rows.forEach((x) => {
        //个人账户没有冻结
        let change_type = x.change_type == 'INCREASE' ? '+' : '-'
        let biz_type
        switch (x.biz_type) {
          case 'work_income':
            biz_type = '工作收入'
            break
          case 'work_time_reward':
            biz_type = '工作时长累计奖励'
            break
          case 'invite_reward':
            biz_type = '邀请奖励'
            break
          case 'recharge':
            biz_type = '充值'
            break
          case 'publish_work':
            biz_type = '发布工作'
            break
          case 'clear':
            biz_type = '工作结算'
            break
          default:
            biz_type = '提现'
        }
        transaction.push({
          change_type,
          biz_type,
          amount: parseFloat(x.amount).toFixed(2),
          biz_order_id: x.biz_order_id,
          created_time: app.timeStampFormatter(x.created_time)
        })
      })
      this.setData({
        transaction,
        url: '/pages/merchant/money/withdraw/withdraw?balance=' + this.data.user.accountBalance
      })
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