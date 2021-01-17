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
            if(res["data"]["code"]==200){
              this.globalData.isLogin = true
            }
          }
        })
      }
    })
  },
  globalData: {
    serverURL: 'https://gcp.hong97.ltd',
    // serverURL: 'http://192.168.31.67:8080',
    isLogin: false
  }
})