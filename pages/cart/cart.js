// pages/cart/cart.js

var global = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    currentTapIndex: 0,
    contentHeight: 0,
    totalPrice: 0,
    isCommitting: false,
    latestCommittedInfo: {},
    commitSucess: false,
    commitSucess: false,
    tapDuringCommitting: false
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
    this.syncCart()
    this.calcTotalPrice()
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
   * 同步购物车记录
   */
  syncCart: function () {
    this.setData({
      cart: global.globalData.cart
    })
    this.calcTotalPrice()
  },
  /**
   * 复选图标响应事件
   */
  handleCheck: function (e) {
    var index = e['currentTarget']['dataset']['cardindex']
    global.checkItem(index)
    this.syncCart()
  },
  /**
   * 计数器响应事件
   */
  handleCount: function (e) {
    var index = e['currentTarget']['dataset']['cardindex']
    if (e['detail']['count'] == 0) {
      global.removeFromCart(index)
    } else {
      global.modifyCountOfItem(index, e['detail']['count'])
    }
    this.syncCart()
  },
  /**
   * 计算总价
   */
  calcTotalPrice: function () {
    var price = 0
    this.data.cart.forEach((item, index) => {
      if (item['checked']) {
        price += item['count'] * item['price']
      }
    })
    this.setData({
      totalPrice: price
    })
  },
  /**
   * 结算购物车
   */
  handleCheckOut: function () {
    var drinksOut = []
    var drinksRemain = []
    global.globalData.cart.forEach((item, index) => {
      if (item['checked']) {
        drinksOut.push(item)
      } else {
        drinksRemain.push(item)
      }
    })
    if (drinksOut.length > 0) {
      this.setData({
        isCommitting: true
      })
      var params = ""
      drinksOut.forEach((v, k) => {
        params += (
          "&drinkID=" + v['drinkID'] + "&"
          + "count=" + (v['count']) + "&"
          + "sugarOption=" + (v['sugarOption']) + "&"
          + "tempOption=" + (v['tempOption'])
        )
      })
      wx.login({
        success: (loginRes) => {
          params = "code=" + loginRes.code + params
          var urlstr = global.globalData.serverURL + '/orderDrink?' + params
          wx.request({
            url: urlstr,
            success: (result) => {
              console.log(result)
              if (result['data']['code'] == 200) {
                global.modifyCart(drinksRemain)
                // 包装一下订单详情，以供之后使用
                var transactionDetail = {
                  'fetchCode': result['data']['data']['fetchCode'],
                  'transactionID': result['data']['data']['transactionID'],
                  'transactionTime': global.timeConverter(result['data']['data']['transactionTime']),
                  'drinks': result['data']['data']['drinks']
                }
                var totalPrice = 0
                transactionDetail.drinks.forEach((drinkItem, drinkIndex) => {
                  global.globalData.drinksInfo.forEach((drinkInfoItem, drinkInfoIndex) => {
                    if (drinkInfoItem['drinkID'] == drinkItem['drinkID']) {
                      drinkItem['drinkName'] = drinkInfoItem['drinkName']
                      drinkItem['imgLink'] = drinkInfoItem['imgLink']
                      drinkItem['price'] = drinkInfoItem['price']
                      totalPrice += drinkItem['price'] * drinkItem['amount']
                    }
                  })
                })
                transactionDetail['totalPrice'] = totalPrice
                this.setData({
                  latestCommittedInfo: transactionDetail,
                  commitSucess: true
                })
              } else {
                this.setData({
                  commitFail: true
                })
              }
            },
            fail: () => {
              this.setData({
                commitFail: true
              })
            },
            complete: () => {
              this.setData({
                isCommitting: false
              })
              this.syncCart()
            }
          });
        }
      })
    }
  },
  /**
   * 退出popup响应
   */
  handleExitDetail: function () {

    this.setData({
      commitSucess: false,
      commitFail: false
    })
  },
  /**
   * 提交时点击
   */
  handleTapDuringCommitting: function () {
    this.setData({
      tapDuringCommitting: true
    })
  }
})