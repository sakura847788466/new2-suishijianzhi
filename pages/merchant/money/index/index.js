// pages/merchant/qianbao/qianbao.js
const dialog = require('../../../../common/dialog.js')
const app = getApp();
Page({
  data: {
      moneyList:[],
      money:'',
      merList: [],
      phoneNum: [],
      backgroundImg: [],
      userId:'',
      accountBalance:'',
      shijian:[],
      pageNum:'1',
      pageSize:'10',
      totalPage:'',
      frozenAmount:"",
    timeStamp:''
  },
  //初始化数据
  init(fn) {
    this.setData({

    })
    this.getMoney();
    fn && fn();
  },
  //获取用户信息
  getBossinfo() {
    app.get(`/portal/user/get`,{}, res => {
      if (res.errorCode === 0) {
        this.setData({
          merList: res.body.userName,
          phoneNum: res.body.loginPhone,
          backgroundImg: res.body.backgroundImg,
          userId:res.body.id,
          accountBalance: res.body.account.accountBalance
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },

  //获取账户余额
  getMoney() {
    app.get(`/portal/accounts`, {}, res => {
      if (res.errorCode === 0) {
        this.setData({
          money: res.body.accountBalance,
          frozenAmount: res.body.frozenAmount
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
//获取充值列表数据
  rechargeRecord: function () {
    var that = this;
    let params = {
      pageSize: that.data.pageSize,
      pageNum: that.data.pageNum
    }
    app.post(`/portal/order/pay/list`, params, res => {
      if (res.errorCode === 0) {
         var timeStamp = res.body.rows;
          for(var i=0;i<timeStamp.length;i++){
            timeStamp[i]["createdTime"] = app.timeStampFormatter(timeStamp[i]["createdTime"]);    
            console.log(timeStamp[i]["createdTime"]);
          }
        that.setData({
          moneyList: res.body.rows,
          shijian: timeStamp,
          totalPage: res.body.totalPage
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
    this.init()
    // app.isLogin(res => {
    //   if (res.errorCode === 0) {//判断是否登录
        this.rechargeRecord();
    //     this.money();
    //   } else if (res.errorCode !== 2) {
    //     dialog.showToast(res.msg)
    //   }
    // });
    

    //   //获取url带过来的参数id
    //   let that = this;
    //   console.log(options)
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
 //触底时间出发

    if (this.data.pageNum < this.data.totalPage - 1) {
         console.log("触底事件触发")
         var pageNum = this.data.pageNum +1;
         console.log(pageNum)
      this.setData({
        pageNum: pageNum
      }, () => {
        // this.rechargeRecord()
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})