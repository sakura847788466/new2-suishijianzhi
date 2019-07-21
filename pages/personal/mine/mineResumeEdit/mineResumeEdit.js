// pages/personal/mine/mineResumeEdit/mineResumeEdit.js
const app = getApp()
const dialog = require('../../../../common/dialog.js')
const getter = require('../../../../common/getUserInfo.js')
const api_host = require('../../../../common/api_host.js')
Page({
  changeLocation: function() {
    wx.navigateTo({
      url: './changeLocation/changeLocation'
    })
  },
  deleteWilling: function(e) {
    let id = e.target.dataset.id
    let annex = this.data.annexs[id]
    wx.navigateTo({
      url: './certificationDelete/certificationDelete?id=' + id + '&name=' + annex.name + '&url=' + annex.url,
    })
  },
  addWilling: function() {
    wx.navigateTo({
      url: './certificationAdd/certificationAdd',
    })
  },
  sexChange: function(e) {
    this.setData({
      ['user.sex']: this.data.sex[e.detail.value]
    })
  },
  dateChange: function(e) {
    this.setData({
      ['user.birth']: e.detail.value
    })
  },
  eduChange(e) {
    this.setData({
      ['user.education']: this.data.edu[e.detail.value]
    })
  },
  inputOnBlur(e) {
    if (/^1[34578]\d{9}$/.test(e.detail.value)) {
      this.setData({
        ['user.phone']: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号码!',
        icon: 'none'
      })
    }
  },
  inputNameBlur(e) {
    if (/^([\u4e00-\u9fa5]){2,7}$/.test(e.detail.value)) {
      this.setData({
        ['user.username']: e.detail.value
      })
    } else {
      wx.showToast({
        title: '请输入中文名字!',
        icon: 'none'
      })
    }
  },
  //上传头像
  upLoadAvatar() {
    let self = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        const tempFilePaths = res.tempFilePaths[0]
        app.uploadMyFlie(tempFilePaths, (url) => {
          self.setData({
            ['user.avatar']: url
          })
        })
      },
    })
  },
  addResume() {
    wx.navigateTo({
      url: './addResume/addResume',
    })
  },
  deleteResume(e) {
    let resumes = this.data.resumes

    resumes.splice(e.target.dataset.itemid, 1)
    this.setData({
      resumes
    })
    wx.setStorageSync('user', this.data.user)
  },

  save() {
    wx.setStorageSync('user', this.data.user)
    const user = this.data.user
    let saveResume = []
    this.data.resumes.forEach((x) => {
      saveResume.push({
        jobTypeId: x.jobTypeId,
        workLong: x.workLong
      })
    })
    console.log(user)

    // 保存简历，字段要和后端一致
    const resume = {
      userName: user.username,
      gender: user.sex === '男' ? 'MAN' : 'WOMAN',
      headerImg: user.avatar,
      birthday: Date.parse(user.birth),
      education: user.education,
      address: user.address,
      longitude: user.longitude,
      latitude: user.latitude,
      resumeList: JSON.stringify(saveResume),
      annexList: JSON.stringify(user.annexs)
    }

    app.post(`/portal/user/setStaffInfo`, resume, res => {
      if (res.errorCode === 0) {
        dialog.showToast('保存成功！')
      }
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    edu: ['无', '小学', '中学', '本科', '硕士', '博士', '博士后'],
    resumes: [],
    annexs: [],
    init: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //onload设置不重新刷新本地user
  onLoad: function(options) {
    let _user = wx.getStorageSync('user')
    //初始化用户简历,只在首次加载进行
    if(this.data.init){
      this.setData({
        user: _user,
        init: false
      })
    }

    //获取工作类型列表
    app.get(`/base/jobType/list`, {}, res => {
      this.setData({
        jobList: res.body.rows
      })

      //将get到的resumes处理
      if (_user.resumes) {
        let resumes = []
        _user.resumes.forEach((item) => {

          resumes.push({
            jobName: (this.data.jobList.find((x) => {
              return (x.id == item.jobTypeId)
            })).name,
            jobTypeId: item.jobTypeId,
            year: Math.floor(item.workLong / 12),
            month: item.workLong % 12,
            workLong: item.workLong
          })
        })
        this.setData({
          resumes
        })
      }

      //将get到的annexs处理
      if (_user.annexs) {
        let annexs = []
        _user.annexs.forEach((item) => {
          annexs.push({
            name: item.name,
            url: item.url
          })
        })
        this.setData({
          annexs
        })
      }

      wx.setStorageSync('resetUser', true)
      if (options.jobTypeId && options.workLong) {
        let item = {
          jobTypeId: options.jobTypeId,
          workLong: options.workLong,
          year: options.year,
          month: options.month,
          jobName: options.jobName
        }
        _user.resumes.push(item)
        this.setData({
          user: _user,
          resumes: _user.resumes
        })
        wx.setStorageSync('user', this.data.user)
        wx.setStorageSync('resetUser', false)
      }

      if (options.name && options.url) {
        let annexs = this.data.annexs
        annexs.push({
          name: options.name,
          url: options.url
        })
        this.setData({
          annexs,
          ['user.annexs']: annexs
        })
        _user.annexs = annexs
        wx.setStorageSync('user', _user)
      }
    })
  },
  onShow: function() {
    if (wx.getStorageSync('resetUser')) {
      this.setData({
        user: wx.getStorageSync('user')
      })
    }
    wx.setStorageSync('resetUser', true)

    //如果改变了某项证书
    if (wx.getStorageSync('changeItem')) {
      let item = wx.getStorageSync('changeItem')
      let annexs = this.data.annexs
      // console.log(annexs[item.id])
      annexs[item.id] = {
        name: item.name,
        url: item.url
      }
      this.setData({
        annexs,
        ['user.annexs']: annexs
      })
      wx.setStorageSync('user', this.data.user)
      wx.removeStorageSync('changeItem')
    }

    //如果选择了删除某项证书
    if (wx.getStorageSync('deleteAnnex')) {
      let deleteAnnex = wx.getStorageSync('deleteAnnex')
      let annexs = this.data.annexs
      console.log(deleteAnnex)
      annexs.splice(deleteAnnex, 1)
      this.setData({
        annexs,
        ['user.annexs']: annexs
      })
      wx.setStorageSync('user', this.data.user)
      wx.removeStorageSync('deleteAnnex')
    }
  }
})