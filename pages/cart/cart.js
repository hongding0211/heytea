// pages/cart/cart.js

var global = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 修改购物车信息，以便更好生成
   */
  syncCart: function () {
    var _cart = global.globalData.cart
    _cart.forEach((cartItem, cartIndex) => {
      global.globalData.drinksInfo.forEach((drinkItem, drinkIndex) => {
        if (cartItem['drinkID'] == drinkItem['drinkID']) {
          cartItem['drinkName'] = drinkItem['drinkName']
          cartItem['imgLink'] = drinkItem['imgLink']
          cartItem['categoryID'] = drinkItem['categoryID']
        }
      })
      global.globalData.categoriesInfo.forEach((categoryItem, categoryIndex) => {
        if (cartItem['categoryID'] == categoryItem['categoryID']) {
          cartItem['categoryName'] = categoryItem['categoryName']
        }
      })
    })
    this.setData({
      cart: _cart
    })
  }
})