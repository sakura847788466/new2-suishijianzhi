// components/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: Number,
      value: true
    },
    eventOpening: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/normal.png',
    selectedSrc: '/image/selected.png',
    halfSrc: '/image/half.png',
    key: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectLeft: function(e) {
      if (this.data.eventOpening) {
        let key = e.currentTarget.dataset.key;
        if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
          //只有一颗星的时候,再次点击,变为0颗
          key = 0;
        }
        this.setData({
          key: key
        })
      }
    },
    //点击左边,整颗星
    selectRight: function(e) {
      if (this.data.eventOpening) {
        let key = e.currentTarget.dataset.key
        console.log("得" + key + "分")
        this.setData({
          key: key
        })
      }
    },
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})