Component({
  properties: {
    currentId:Number
  },
  data: {
    
  },
  methods: {
    handleClick(e){
      let currentId = e.currentTarget.dataset.id
      switch(currentId){
        case 0 :
          wx.reLaunch({
            url:'/pages/merchant/index/index'
          })
          break;
        case 1:
          wx.reLaunch({
            url: '/pages/merchant/recruit/index/index'
          })
          break;
        case 2:
          wx.navigateTo({
            url: '/pages/merchant/recruit/post/post'
          })
          break;
        case 3:
          wx.reLaunch({
            url: '/pages/user/msgList/msgList'
          })
          break;
        case 4:
          wx.reLaunch({
            url: '/pages/merchant/merCenter/index/index'
          })
          break;
      }
    }
  },
  ready() {
    
  }
})