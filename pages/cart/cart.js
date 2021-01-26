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
    totalPrice: 0
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
    this.calcTotalPrice()
    this.setData({
      cart: global.globalData.cart
    })
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
  calcTotalPrice: function() {
    var price = 0
    this.data.cart.forEach((item,index)=>{
      if(item['checked']){
        price+=item['count']*item['price']
      }
    })
    this.setData({
      totalPrice: price
    })
  }
})