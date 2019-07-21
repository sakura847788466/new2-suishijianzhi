Component({
  properties: {
    longitude: Number,
    latitude:Number,
    province:String,
    city:String,
    area:String,
    address:String
  },
  data: {

  },
  methods: {
    //获取地图
    toMap() {
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 18,
        name: this.data.address,
        address: this.data.province + this.data.city + this.data.area + this.data.address,
      })
    },
  },
  ready() {

  }
})