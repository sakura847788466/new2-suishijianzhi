const app = getApp()
Component({
  properties: {
    title:String
  },
  data: {
    currentCity: wx.getStorageSync('cityName') ? wx.getStorageSync('cityName') : '定位中…'
  },
  methods: {
    toSearch(){
      wx.navigateTo({
        url: '/pages/user/search/search?title='+this.data.title,
      })
    }
  },
  ready() {
    let timer = setInterval(()=>{
      let currentCity = wx.getStorageSync('cityName')
      if (currentCity) {
        this.setData({
          currentCity
        })
        clearInterval(timer)
      }
    },1000)
    
  }
})