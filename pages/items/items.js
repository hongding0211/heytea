// pages/items/items.js
var global = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drinksInfo: [],
    categoriesInfo: [],
    drinksInfoLoaded: false,
    categoriesInfoLoaded: false,
    contentHeight: 0,
    tapped: false,
    currentChoseDrink: {},
    sugarOption: [
      '全糖', '7分', '5分', '3分', '无糖',
    ],
    tempOption: [
      '正常冰', '少冰', '去冰', '常温', '热'
    ],
    sugarChecked: 0,
    tempChecked: 0,
    currentCount: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchCategoriesInfo()
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
    this.fetchDrinksInfo()
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
   * 获取所有饮品信息
   */
  fetchDrinksInfo: function () {
    wx.request({
      url: global.globalData.serverURL + '/getdrink/',
      success: res => {
        if (res['data']['code'] == 200) {
          global.globalData.drinksInfo = res['data']['data']
          this.setData({
            drinksInfo: res['data']['data'],
            drinksInfoLoaded: true
          })
          console.log(this.data.drinksInfo)
        }
      }
    })
  },
  /**
   * 获取所有分类信息
   */
  fetchCategoriesInfo: function () {
    wx.request({
      url: global.globalData.serverURL + '/getcategory/',
      success: res => {
        if (res['data']['code'] == 200) {
          global.globalData.categoriesInfo = res['data']['data']
          res['data']['data'].forEach(function (item, index) {
            item['activeImage'] = item['imgName']
            item['defaultImage'] = item['imgName']
          })
          this.setData({
            categoriesInfo: res['data']['data'],
            categoriesInfoLoaded: true
          })
          console.log(this.data.categoriesInfo)
        }
      }
    })
  },
  /**
   * 切换标签，tapic
   */
  tabchanged: function () {
    wx.vibrateShort({
    });
  },
  /**
   * 用户点开一个饮品
   */
  handleChoosespecs: function (e) {
    var drinkID = (e['currentTarget']['dataset']['drinkid'])
    this.data.drinksInfo.forEach(drink => {
      if (drinkID == drink['drinkID']) {
        this.setData({
          currentChoseDrink: drink,
          sugarChecked: 0,
          tempChecked: 0,
          currentCount: 1,
          tapped: true
        })
      }
    })
  },
  /**
   * 点击背景推出详细页面
   */
  handleExitDetail: function () {
    this.setData({
      tapped: false
    })
  },
  /**
   * 点击糖度
   */
  handleSugarCheck: function (e) {
    this.setData({
      sugarChecked: e['currentTarget']['dataset']['sugarchecked']
    })
  },
  /**
   * 点击温度
   */
  handleTempCheck: function (e) {
    this.setData({
      tempChecked: e['currentTarget']['dataset']['tempchecked']
    })
  },
  /**
   * 添加到购物车
   */
  handleAdd2Cart: function () {
    var order = {
      'drinkID': this.data.currentChoseDrink['drinkID'],
      'drinkName': this.data.currentChoseDrink['drinkName'],
      'imgLink': this.data.currentChoseDrink['imgLink'],
      'price': this.data.currentChoseDrink['price'],
      'count': this.data.currentCount,
      'sugarOption': this.data.sugarOption[this.data.sugarChecked],
      'tempOption': this.data.tempOption[this.data.tempChecked],
      'checked': true
    }
    global.add2Cart(order)
    this.setData({
      tapped: false
    })
  },
  /**
   * 点击计数器
   */
  handleCount: function (e) {
    this.setData({
      currentCount: e['detail']['count']
    })
  }
})