// pages/user/user.js

var global = getApp()



Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isClickedButton: false,
    transactionDetail: {},
    drinksInfo: [],
    categoriesInfo: [],
    contentHeight: 0,
    justTappedIndex: 0,
    tapped: false,
    dataFetched: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          contentHeight: result.windowHeight * 750 / result.windowWidth
        })
      }
    })
    // 从全局变量中，拿出饮品、分类信息
    this.setData({
      drinksInfo: global.globalData.drinksInfo,
      categoriesInfo: global.globalData.categoriesInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.setData({
      isLogin: global.globalData.isLogin,
      isClickedButton: false
    })
    this.fetchTransactionDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 向服务器发送注册请求
   */
  register: function () {
    // 先拿到 code
    wx.login({
      success: loginRes => {
        // 再获取用户信息
        wx.getUserInfo({
          success: userRes => {
            // 最后发出注册请求                        
            wx.request({
              url: global.globalData.serverURL + '/register/',
              data: {
                code: loginRes.code,
                name: userRes['userInfo']['nickName'],
                sex: userRes['userInfo']['gender'],
                region: userRes['userInfo']['province']
              },
              // 注册请求成功后处理
              success: res => {
                this.setData({
                  isLogin: true
                })
                global.globalData.isLogin = true
              }
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击授权登录按钮后
   */
  getUserInfo: function (res) {
    this.register()
    this.setData({
      isClickedButton: true
    })
    this.fetchTransactionDetail()
  },
  /**
   * 获取用户订单信息
   */
  fetchTransactionDetail: function () {
    this.setData({
      dataFetched: false
    })
    wx.login({
      success: (loginRes) => {
        wx.request({
          url: global.globalData.serverURL + '/getTransactionDetail/',
          data: {
            code: loginRes.code
          },
          success: res => {
            this.setData({
              dataFetched: true
            })
            if (res['data']['code'] == 200) {
              // 修饰数据
              res['data']['data']['transactions'].forEach((transactionItem, transactionIndex) => {
                var totalPrice = 0
                var count = 0
                transactionItem['transactionTime'] = global.timeConverter(transactionItem['transactionTime'])
                transactionItem['drinks'].forEach((drinkItem, drinkIndex) => {
                  global.globalData.drinksInfo.forEach((drinkInfoItem, drinkInfoIndex) => {
                    if (drinkInfoItem['drinkID'] == drinkItem['drinkID']) {
                      drinkItem['imgLink'] = drinkInfoItem['imgLink']
                      totalPrice += drinkItem['price'] * drinkItem['amount']
                      count += drinkItem['amount']
                    }
                  })
                })
                transactionItem['totalPrice'] = totalPrice
                transactionItem['count'] = count
              })
              this.setData({
                transactionDetail: res['data']['data']['transactions']
              })
            }
          }
        })
      }
    })
  },
  /**
   * 点击卡片
   */
  handleTapCard: function (e) {
    this.setData({
      justTappedIndex: e['currentTarget']['dataset']['index'],
      tapped: true
    })
  },
  /**
   * 点击退出
   */
  handleExitDetail: function () {
    this.setData({
      tapped: false
    })
  }
})