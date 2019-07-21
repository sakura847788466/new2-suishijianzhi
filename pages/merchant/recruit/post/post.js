const app = getApp(),
  dialog = require('../../../../common/dialog.js');
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    jobTypes:[],
    jobTypeIndex:-1,
    jobTypeName:''
  },
  //获取工作类型
  getJobType() {
    app.get(`/base/jobType/list`,{}, res => {
      if (res.errorCode === 0) {
        this.setData({
          jobTypes: res.body.rows,
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //选择工作类型
  setJobType(e){
    let index = e.detail.value
    let jobTypes = this.data.jobTypes
    this.setData({
      jobTypeId: jobTypes[index].id,
      jobTypeName: jobTypes[index].name
    })
  },
  //选择开始日期
  setWorkStartDate(e){
    this.setData({
      workStartDate:e.detail.value
    })
  },
  //选择结束日期
  setWorkEndDate(e) {
    this.setData({
      workEndDate: e.detail.value
    })
  },
  //选择开始时间
  setWorkStartTime(e) {
    this.setData({
      workStartTime: e.detail.value
    })
  },
  //选择结束时间
  setWorkEndTime(e) {
    this.setData({
      workEndTime: e.detail.value
    })
  },
  //选择地址
  chooseLoaction() {
    let _this = this;
    wx.chooseLocation({
      success(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let address = res.name
        _this.setData({
          latitude,
          longitude,
          address,
        })
        qqmapsdk = new QQMapWX({
          key: 'EWHBZ-UKQKX-NYX4U-TAHAH-VHMYV-GVBNF'
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: function (r, data) {
            let location = r.result.address_component
            let province = location.province
            let city = location.city
            let area = location.district
            _this.setData({
              province,
              city,
              area
            })
          }
        })
      },
      fail(res) {
        dialog.showToast('定位失败')
      }
    })
  },
  //提交审核
  toCheck(e){
    
    let params = e.detail.value
    if(params.title === ''){
      dialog.showToast('兼职标题为空')
      return
    } else if (params.jobTypeId === ''){
      dialog.showToast('工作岗位为空')
      return
    } else if (params.planWorkerNum === '') {
      dialog.showToast('招聘人数为空')
      return
    } else if (params.hourlyPay === '') {
      dialog.showToast('兼职薪资为空')
      return
    } else if (params.province === '' || params.city === '' || params.area === '' || params.address === '' || params.latitude === '' || params.longitude === '') {
      dialog.showToast('请重新定位')
      return
    } else if (params.workStartDate === '') {
      dialog.showToast('开始日期为空')
      return
    } else if (params.workEndDate === '') {
      dialog.showToast('结束日期为空')
      return
    } else if (params.workStartTime === '') {
      dialog.showToast('开始工作时间为空')
      return
    } else if (params.workEndTime === '') {
      dialog.showToast('结束工作时间为空')
      return
    } else if (params.des === '') {
      dialog.showToast('职位描述为空')
      return
    } else if (params.contactName === '') {
      dialog.showToast('联系人为空')
      return
    } else if (params.contactPhone === '') {
      dialog.showToast('联系电话为空')
      return
    } else if (params.readyTime === '') {
      dialog.showToast('提前到岗时间为空')
      return
    }
    console.log(params)
    app.post(`/portal/jobs`,params,res=>{
      if(res.errorCode === 0){
        dialog.showInfo('提交成功', '审核结果将通过短信方式发\n至您的手机号。', '确定', r => {
          if (r.confirm) {
            wx.navigateTo({
              url: '/pages/merchant/recruit/index/index',
            })
          }
        })
      }else{
        dialog.showInfo('提交失败', res.msg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nowDate: app.transformTime(new Date().getTime())
    })
    this.getJobType()
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