const app = getApp()

function getUserInfomation(_this, cb) {
  app.get(`/portal/user/get`, {}, res => {
    const data = res.body
    const account = data.account
    const _date = new Date(data.birthday)
    let year = _date.getFullYear()
    let month = ("0" + (_date.getMonth() + 1)).slice(-2)
    let day = ("0" + _date.getDate()).slice(-2);

    _this.setData({
      user: {
        username: data.userName,
        avatar: data.headerImg,
        accountBalance: parseFloat(account.accountBalance).toFixed(2),
        phone: data.loginPhone,
        sex: data.gender === 'MAN' ? '男' : '女',
        address: data.address,
        birth: year + '-' + month + '-' + day,
        city: data.city,
        accountDetails: account.accountDetails,
        education: data.education,
        latitude: data.latitude,
        longitude: data.longitude,
        resumes: data.resumes,
        annexs: data.annexs,
        employeeMonthStatistics: data.employeeMonthStatistics,
        staffUserStatistics: data.staffUserStatistics,
        inviteCode: data.inviteCode,
        inviterCode: data.inviterCode,
        qrCodeUrlSmall: data.qrCodeUrlSmall,
        inviteList: data.inviteList
      }
    })
    wx.setStorageSync('user', _this.data.user)
    cb && cb()
  })
}

module.exports = {
  getUserInfomation
}