const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    
  },
  //初始化
  init(fn){
    this.setData({
      latitude: wx.getStorageSync('latitude'),
      longitude: wx.getStorageSync('longitude'),
      filterId: -1,
      filterDown: false,
      pageNum: 0,
      pageSize: 15,
      totalPage:0,
      title: this.options.title ? this.options.title : '',
      currentJobTypeId: this.options.jobtype ? this.options.jobtype : '',
      jobTypeId: this.options.jobtype ? this.options.jobtype : '',
      currentAreaCode:'',
      areaCode:'',
      jobList:[],
      currentJobSortType:'none',
      jobSortType:'none',
    })
    let cityCode = wx.getStorageSync('cityCode');
    if(cityCode){
      this.getArea(cityCode)
    }else{
      let timer = setInterval(()=>{
        let cityCode2 = wx.getStorageSync('cityCode');
        if (cityCode2) {
          this.getArea(cityCode2)
          clearInterval(timer)
        }
      },1000)
    }
    this.getJobType()
    this.getJobs()
    fn && fn()
  },
  //选择筛选分类
  handleFilter(e){
    let newFilterId = e.currentTarget.dataset.id,
        oldFilterId = this.data.filterId,
        filterDown = this.data.filterDown
    if (oldFilterId === newFilterId && filterDown){
      this.setData({
        filterId: -1,
        filterDown: false,
        currentJobTypeId:this.data.jobTypeId,
        currentAreaCode:this.data.areaCode
      })
    }else{
      this.setData({
        filterId: newFilterId,
        filterDown: true
      })
    }
  },
  handleFilter2(){
    if (this.data.filterDown){
      this.setData({
        filterId: -1,
        filterDown: false,
        currentJobTypeId: this.data.jobTypeId,
        currentAreaCode: this.data.areaCode,
        currentJobSortType: this.data.jobSortType
      })
    }
  },
  //隐藏
  hideFilter(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      filterId: -1,
      filterDown: false,
      jobTypeId:this.data.currentJobTypeId,
      areaCode:this.data.currentAreaCode,
      jobSortType: this.data.currentJobSortType
    })
    this.getJobs(0);
  },
  //获取全部兼职
  getJobs(n){
    if(n === 0){
      this.setData({
        pageNum:0,
        totalPage:0,
        jobList:[],
      })
    }
    let params = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      jobTypeId: this.data.jobTypeId,
      area:this.data.areaCode,
      lat: this.data.latitude,
      lng: this.data.longitude,
      title:this.data.title,
      jobSortType: this.data.jobSortType,
      jobStatus: 'unpay,onShelf'
    }
    app.get(`/portal/jobs/list`,params,res=>{
      if(res.errorCode === 0){
        let jobList = res.body.rows
        jobList.map(item=>{
          item.distance = (item.distance/1000000).toFixed(1)
        })
        this.setData({
          jobList: this.data.jobList.concat(jobList),
          totalPage:res.body.totalPage
        })
      } else if (res.errorCode !== 2){
        dialog.showToast(res.msg)
      }
    })
  },
  //跳转兼职详情页
  toJobDetail(e){
    app.isLogin((res)=>{
      if(res.errorCode === 0){
        wx.navigateTo({
          url: '/pages/merchant/detail/jobDetail/jobDetail?id=' + e.currentTarget.dataset.id,
        })
      }
    })
  },
  //获取岗位
  getJobType(){
    app.get(`/base/jobType/list`,{},res=>{
      if(res.errorCode === 0){
        this.setData({
          jobType:res.body.rows
        })
      }
    })
  },
  //选择职位岗位筛选
  chooseJobType(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      currentJobTypeId:id
    })
  },
  //获取区域
  getArea(cityCode) {
    app.get(`/base/address/area/list`, { cityCode }, res => {
      if (res.errorCode === 0) {
        this.setData({
          areaList: res.body
        })
      }
    })
  },
  //选择职位岗位筛选
  chooseArea(e) {
    let code = e.currentTarget.dataset.code
    this.setData({
      currentAreaCode: code
    })
  },
  //选择排序
  chooseSort(e){
    let value = e.currentTarget.dataset.value
    this.setData({
      currentJobSortType:value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    if(this.data.pageNum < this.data.totalPage - 1){
      this.setData({
        pageNum:this.data.pageNum + 1
      },()=>{
        this.getJobs()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})