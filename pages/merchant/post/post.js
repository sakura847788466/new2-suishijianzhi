// pages/merchant/post/post.js
const app = getApp();
const dialog = require("../../../common/dialog.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    worker: [
      
    ],
    zhaopin:'',
    xinzi:'',
    startData:'',
    date: '2019-12-13',
    datetwo:'2016-12-3',
    datethere:'2019-01-09',
    time: '',
    des:'',
    lianxiren: '',
    phone:'',
    beizhu: '',
    jobTypeId:'',
    workerIndex:0,
    miaoshu:'',
    addr:''
  },
 //日期选择器
  bindDateChange1: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      datetwo: e.detail.value
    })
  },
  bindDateChangethere: function (e) {
    this.setData({
      datethere: e.detail.value
    })
  },
//工作类型选择
  bindWorkChange: function (e) {
    this.setData({
      workerIndex:e.detail.value
    })
  },
  //工作地点
  addr:function(e){
    this.setData({
      addr:e.detail.value
    })
    console.log(this.data.addr)
  },
  //兼职描述
  miaoshu: function (e) {
    console.log(e.currentTarget.dataset.id)

    this.setData({
      miaoshu: e.currentTarget.dataset.id
    })
      console.log(this.data.miaoshu)
  },

  //输入标题（表单输入）
    shuru:function(e){
      this.setData({
        title: e.detail.value
      })
    },

    //招聘人数
  zhaopin: function (e) {
    this.setData({
      zhaopin: e.detail.value
    })
    console.log(this.data.zhaopin)
  },
  //薪资
  xinzi: function (e) {
    this.setData({
      xinzi: e.detail.value
    })
    console.log(this.data.xinzi)
  },
  //联系人
  lianxiren: function (e) {
    this.setData({
      lianxiren: e.detail.value
    })
    console.log(this.data.lianxiren)
  },
  //联系电话
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(this.data.phone)
  },
  //工作地点
  localtion: function (e) {
    this.setData({
      localtion: e.detail.value
    })
    console.log(this.data.localtion)
  },
  //备注
  beizhu: function (e) {
    this.setData({
      beizhu: e.detail.value
    })
    console.log(this.data.beizhu)
  },

  //工作类型的获取
  jobType() {
    let params = {

    }
    app.get(`/base/jobType/list`, params, res => {
      if (res.errorCode === 0) {
        this.setData({
          worker: res.body.rows,
        })
        console.log(11,this.data.worker)
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })

  },
  
//获取本地存储的兼职描述
  huoqu:function(){
    var that = this;
    wx.getStorage({
      key: 'des',
      success: function(res) {
        that.setData({
          des:res.data
        })
      },
    })

  },
  //同意协议
  xieYi() {
    let params = {

    }
    app.get(`/portal/user/agree`, params, res => {
      if (res.errorCode === 0) {
        console.log(res)
        // this.setData({
        //   worker: res.body.rows,
        // })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })

  },
  //提交审核
  submitt() {
    let params = {
      readyTime: '150',
      jobTypeId: 1008,
      requireWorkYears:2,
      requireEducation:'本科',
      title: this.data.title,
      des:this.data.des,
      planWorkerNum:10,
      hourlyPay:10,
      workStartDate: this.data.date,
      workEndDate:this.data.datatwo,
      workStartTime:this.data.data,
      workEndTime:this.data.datatwo,
      address:'广州琶洲国际采购中心',
      city:'广州市',
      province:'广东省',
      area:'天河区',
      contactName:this.data.lianxiren,
      contactPhone:this.data.phone,
      longitude:23,
      latitude:22


    }
    app.post(`/portal/jobs`, params, res => {
      if (res.errorCode === 0) {
        console.log(res)
        // this.setData({
        //   cityList: res.body

        // })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getshopType();
        this.huoqu();
        this.jobType();
        this.xieYi();
        console.log(options.text)
        this.setData({
            des:options

        })
        console.log(this.data.des)
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