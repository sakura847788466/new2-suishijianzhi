const app = getApp(),
  dialog = require('../../../../common/dialog.js')
Page({
  data: {
    currentUserId:''
  },
  //初始化
  init(fn){
    this.setData({
      isUnfold: false,
    })
    this.getCurrentInfo()
    this.getDetail()
    fn && fn()
  },
  //获取详情
  getDetail(){
    let _this = this;
    let id = this.options.id
    app.get(`/portal/jobs/${id}`,{id},res=>{
      if(res.errorCode === 0){
        this.setData({
          detail:res.body
        })
        let query = wx.createSelectorQuery().in(this);
        query.select('.detail-content').boundingClientRect().exec(res => {
          let height = res[0].height;
          if(height>250){
            _this.setData({
              ifFold:true
            })
          }
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //控制收起展开
  handleFold(){
    this.setData({
      isUnfold: !this.data.isUnfold
    })
  },
  //跳转商家详情
  toMerDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/merchant/detail/merchantDetail/merchantDetail?id=' + id,
    })
  },
  //抢单
  grab(){
    dialog.showModal('确定抢此单？','最多同时开抢5个订单，抢单成功后系统自动取消与之时间冲突的订单。',res=>{
      if(res.confirm){
        app.get(`/portal/jobsApply/apply/${this.options.id}`,{id:this.options.id},res=>{
          if(res.errorCode === 0){
            dialog.showInfo('正在抢单', '等待商家录用，结果请留意系统信息和查收手机短信。','我知道了')
          }else{
            dialog.showToast(res.msg)
          }
        })
      }
    })
  },
  //跳转查看员工
  toStaffList(){
    wx.navigateTo({
      url: "/pages/merchant/recruit/checkWorker/checkWorker?id=" + this.options.id,
    })
  },
  //获取当前登录信息
  getCurrentInfo(){
    app.get(`/portal/user/get`,{},res=>{
      if(res.errorCode === 0){
        this.setData({
          currentUserId:res.body.id
        })
      }
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
	this.setData({
      role:wx.getStorageSync('role')
    })
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