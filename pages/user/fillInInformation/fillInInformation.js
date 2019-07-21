Page({

  /**
   * 页面的初始数据
   */
  data: {
    cursor: 0,
    imgUrl: '',
    imgState: true,
    hiddState: 3,
    address: "点击选择",
    winHeight: 0,
    city: "广州",
    valLength: 0
  },
  showDialog() {
    this.modal.showModal();
  },
  _cancelEvent() {
    console.log('你点击了取消');
    this.modal.hideModal();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.modal.hideModal();
  },
  cancel() {
    this.setData({
      sxkVal: '',
      valLength: 0
    })
  },
  binInput(e) {
    this.setData({
      sxkVal: e.detail.value,
      valLength: e.detail.value.length
    })
  },
  add(e) {
    this.setData({
      hiddState: e.currentTarget ? e.currentTarget.dataset.ind : e
    })
    wx.setNavigationBarTitle({
      title: this.data.hiddState ? '认证资料' : "填写资料"
    })
  },
  preservation() {
    this.add(1);
  },
  textArea(e) {
    this.setData({
      cursor: e.detail.value.length
    })
  },
  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        let
          imgSize = res.tempFiles[0].size,
          pos = tempFilePaths.lastIndexOf("."),
          lastname = tempFilePaths.substring(pos, tempFilePaths.length);
        if (lastname == ".jpg" && imgSize <= 2097152) {
          _this.setData({
            imgState: !_this.data.imgState,
            imgUrl: tempFilePaths
          })
        } else {
          if (lastname != ".jpg") {
            wx.showToast({
              title: '请上传jpg格式图片',
              mask: true,
              icon: 'none'
            })
            return false;
          }
          wx.showToast({
            title: '请上传小于2M图片',
            duration: 2700,
            mask: true,
            icon: 'none'
          })
        }
      }
    })
  },
  cityTap(e) {
    console.log(e);
    this.add(3);
    const cityName = e.detail.cityname;
    this.setData({
      city: cityName
    })
    console.log(cityName, 'kkk');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const win = wx.getSystemInfoSync();
    this.setData({
      winHeight: win.windowHeight
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.modal = this.selectComponent("#modal");
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