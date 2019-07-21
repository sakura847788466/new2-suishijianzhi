// pages/merchant/shopsetHead/sopsetHead.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merList:[],
    phoneNum:[],
    backgroundImg:[],
    shopinfoList:[],
    img_arr:''
  },
  tiaozhuan() {
    wx.navigateTo({
      url: 'pages/merchant/phoneNum/phoneNum',
    })
  },
  //获取个人信息
  getShopinfo() {
    let params = {
    }
    app.get(`/portal/user/get`, params, res => {
      if (res.errorCode === 0) {
        this.setData({
          shopinfoList: res.body
        })
      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },
  //上传图片
  upload: function () {
    var that = this
    var imgfile; 
      wx.uploadFile({
        url: 'https://sit.xsili.net/test/api/suishijian//v1/base/upload/ueditor_uploadimage',//上传的接口地址
        filePath: that.data.img_arr,
        name: 'content',
        success: function (res) {
          console.log(res)
          if (res) {
            console.log("返回的参数信息" + res.data)
            wx.showToast({
              title: '上传成功',
              duration: 3000
            });
          }
        }
      })
  },
//拍照
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          });
          console.log(that.data.img_arr)//本地文件存储路径
          that.upload();
        }
      })
    } else {
     
    }
  },  
  //获取当前对象的信息
  getBossinfo() {
    let params = {

    }
    app.get(`/portal/user/get`, params, res => {
      if (res.errorCode === 0) {
        this.setData({
          merList: res.body.userName,
          phoneNum: res.body.loginPhone,
          backgroundImg: res.body.backgroundImg,
          id: res.body.id
        })
        console.log(res.body.id)

      } else if (res.errorCode !== 2) {
        dialog.showToast(res.msg)
      }
    })
  },

  //获取当前手机号码
   getPhone:function(e){
     console.log(e.target.id)
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.ctx = wx.createCameraContext()
    this.getShopinfo();
    
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