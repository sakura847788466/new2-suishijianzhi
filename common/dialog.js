//
function showModal(title, content, cb) {
  wx.showModal({
    title,
    content,
    showCancel: true,
    cancelColor: '#000',
    confirmColor: '#108EE9',
    success(res) {
      if (cb) {
        cb(res)
      }
    }
  })
}
//
function showModal2(title, content, confirmText, cancelText, cb) {
  wx.showModal({
    title,
    content,
    showCancel: true,
    confirmText: confirmText,
    confirmColor: '#108EE9',
    cancelText: cancelText,
    cancelColor: '#000',
    success(res) {
      if (cb) {
        cb(res)
      }
    }
  })
}
//
function showInfo(title, content, confirmText, cb) {
  wx.showModal({
    title,
    content,
    showCancel: false,
    confirmText: confirmText || "确定",
    confirmColor: '#108EE9',
    success(res) {
      if (cb) {
        cb(res)
      }
    }
  })
}
//
function showToast(title, icon, image) {
  wx.showToast({
    title: title,
    icon: icon || "none",
    image: image,
    duration: 1500,
    mask: true
  })
}
//
function showLoading(title) {
  wx.showLoading({
    title,
  })
}
//
function hideLoading() {
  wx.hideLoading()
}

module.exports = {
  showModal,
  showModal2,
  showInfo,
  showToast,
  showLoading,
  hideLoading
}