const app = getApp(),
  dialog = require('../../common/dialog.js'),
  apiHost = require('../../common/api_host.js')
Component({
  properties: {
    role: String
  },
  data: {

  },
  methods: {
    //跳转富文本页面
    toRichText(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/user/richText/richText?type=1&id=' + id
      })
    },
    //获取轮播图
    getBannerList(role) {
      let userTypeEnum = '';
      //   role = wx.getStorageSync('role');
      if (role === '1') {
        userTypeEnum = 'employer'
      } else if (role === '2') {
        userTypeEnum = 'staff'
      } else {
        wx.reLaunch({
          url: '/pages/user/userSelect/userSelect',
        })
        return;
      }
      app.get(`/base/banner/list`, { userTypeEnum }, res => {
        if (res.errorCode === 0) {
          this.setData({
            bannerList: res.body.rows
          })
        } else if (res.errorCode !== 2) {
          dialog.showToast(res.msg)
        }
      })
    }
  },
  ready() {
    this.getBannerList(this.data.role);
  }
})