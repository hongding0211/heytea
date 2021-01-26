//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.serverURL + '/login/',
          data: { code: res.code },
          success: res => {
            console.log(res)
            // 登录成功
            if (res["data"]["code"] == 200) {
              this.globalData.isLogin = true
            }
          }
        })
      }
    })
  },
  onShow: function () {
    // 载入购物车数据
    wx.getStorage({
      key: 'cart',
      success: res => {
        this.globalData.cart = res['data']
      },
      fail: () => {
        this.globalData.cart = []
      },
      complete: () => {
        this.updateCartIcon()
      }
    })
  },
  onHide: function () {
    // 储存购物车数据
    wx.setStorage({
      data: this.globalData.cart,
      key: 'cart',
    })
  },
  globalData: {
    serverURL: 'https://gcp.hong97.ltd',
    // serverURL: 'http://192.168.31.67:8080',
    isLogin: false,
    drinksInfo: [],
    categoriesInfo: [],
    cart: []
  },
  add2Cart: function (res) {
    // 判断是否有一样的，有的话合并进去
    var flag = false
    this.globalData.cart.forEach((item, index) => {
      if (item['drinkID'] == res['drinkID'] && item['sugarOption'] == res['sugarOption']
        && item['tempOption'] == res['tempOption']) {
        item['count'] += res['count']
        item['checked'] = true
        flag = true
      }
    })
    if (!flag) {
      this.globalData.cart.push(res)
    }
    this.updateCartIcon()
  },
  removeFromCart: function (i) {
    if (this.globalData.cart.length > i) {
      this.globalData.cart.splice(i, 1)
    }
    this.updateCartIcon()
  },
  modifyCart: function (i, data) {
    if (this.globalData.cart.length > i) {
      this.globalData.cart[i] = data
    }
    this.updateCartIcon()
  },
  updateCartIcon: function () {
    if (this.globalData.cart.length > 0) {
      wx.showTabBarRedDot({
        index: 1
      });
    } else {
      wx.hideTabBarRedDot({
        index: 1
      });
    }
  },
  checkItem: function (i) {
    if (this.globalData.cart.length > i) {
      this.globalData.cart[i]['checked'] = !this.globalData.cart[i]['checked']
    }
  },
  modifyCountOfItem: function (i, count) {
    if (this.globalData.cart.length > i && count >= 1) {
      this.globalData.cart[i]['count'] = count
    }
  }
})