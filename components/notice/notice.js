const app = getApp(),
  dialog = require('../../common/dialog.js'),
  apiHost = require('../../common/api_host.js')
Component({
  properties: {
    role:String
  },
  data: {
    noticeText:'',
    animation:null
  },
  methods: {
    //获取广告长度
    getNoticeLong() {
      let _this = this,
        count = 0;
      let query_out = wx.createSelectorQuery().in(this);
      let query_inner = wx.createSelectorQuery().in(this);
      query_out.select('.notice-content').boundingClientRect().exec(res => {
        let out_width = res[0].width;
        query_inner.select('.notice-content-text').boundingClientRect().exec(res => {
          let inner_width = res[0].width;
          _this.addAnimation(out_width, inner_width);
        })
      })
    },
    //添加动画
    addAnimation(out_width, inner_width) {
      let _this = this;
      let count = 0;
      let translateX = out_width - inner_width;
      if (translateX <= 0) {
        let animation = wx.createAnimation({
          duration: -translateX / 20 * 500,
          timingFunction: "linear",
          delay: 0
        });
        animation.left(translateX - 10).step();
        setTimeout(() => {
          _this.setData({
            animation: animation.export()
          })
          setTimeout(() => {
            _this.stopAnimation(_this.addAnimation(out_width, inner_width))
          }, -translateX / 20 * 500 + 1000)
        }, 2000)
      }
    },
    //还原动画
    stopAnimation(fn) {
      let animation = wx.createAnimation({
        duration: 0,
        timingFunction: "linear",
        delay: 0
      });
      animation.left(0).step();
      this.setData({
        animation: animation.export()
      })
      fn && fn()
    },
    //获取广告内容
    getNoticeText(){
      let role = this.data.role,
        path = ''
      if(role === '1'){
        path = '/base/config/get_marquee'
      }else if(role === '2'){
        path = '/base/config/get_marquee_employee'
      }else{
        return
      }
      app.get(path,{},res=>{
        if(res.errorCode === 0){
          this.setData({
            noticeText: res.body.value
          },()=>{
            this.getNoticeLong()
          })
        }
      })
    }
  },
  ready() {
    this.getNoticeText()
  }
})