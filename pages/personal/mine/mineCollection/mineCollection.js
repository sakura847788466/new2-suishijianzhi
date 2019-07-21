// pages/personal/mine/mineCollection/mineCollection.js
const app = getApp()
Page({
  distance(la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;

    var La2 = la2 * Math.PI / 180.0;

    var La3 = La1 - La2;

    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

    s = s * 6378.137;//地球半径

    s = Math.round(s * 10000) / 10000;

    return s
  },
  async solveCollection(collection){
    collection.forEach((x) => {
      //数据处理
      const date_start = new Date(x.work_start_date)
      const date_end = new Date(work_end_date)
      let date = date_start.getMonth() + '.' + date_start.getDay() + '~' + date_end.getMonth() + '.' + date_end.getDay()
      const work_longitude = x.longitude
      const work_latitude = x.latitude
      //距离换算
      const distance = self.distance(work_latitude, work_longitude, self.data.latitude, self.data.longitude)
      a.push({
        isValid: x.job_status === 'onShelf' ? true : false,
        job_type_name: x.job_type_name,
        hourly_pay: x.hourly_pay,
        address: x.address,
        work_start_date: date,
        distance
      })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    collection: [{
      isValid: true,
      wage: '¥ 300／h',
      distance: '11.5km',
      location: '广州国际采购中心',
      name: '广发银行充场'
    }, {
      isValid: false,
      wage: '¥ 300／h',
      distance: '11.5km',
      location: '广州国际采购中心',
      name: '广发银行充场'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const self = this
    wx.getLocation({
      success(res) {
        const longitude = res.longitude
        const latitude = res.latitude
        self.setData({
          longitude,
          latitude
        })
        app.get(`/portal/jobcollections`, {}, res => {
          if (res.body) {
            let collection = res.body
            let a = []
            // collection.forEach((x) => {
            //   //数据处理
            //   const date_start = new Date(x.work_start_date)
            //   const date_end = new Date(work_end_date)
            //   let date = date_start.getMonth() + '.' + date_start.getDay() + '~' + date_end.getMonth() + '.' + date_end.getDay()
            //   const work_longitude = x.longitude
            //   const work_latitude = x.latitude
            //   //距离换算
            //   const distance = self.distance(work_latitude, work_longitude, self.data.latitude, self.data.longitude)
            //   a.push({
            //     isValid: x.job_status === 'onShelf' ? true : false,
            //     job_type_name: x.job_type_name,
            //     hourly_pay: x.hourly_pay,
            //     address: x.address,
            //     work_start_date: date,
            //     distance
            //   })
            // })
          }
        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})