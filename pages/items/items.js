// pages/items/items.js
var global = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drinksInfo:[],
    drinksInfoLoaded: false
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
    // ONLY FOR DEBUG
    // wx.login({
    //   success: res=>{
    //     console.log(res)
    //   }
    // })
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
  fetchDrinksInfo: function(){
    wx.request({
      url: global.globalData.serverURL + '/getdrink/',
      success: res=>{
        if(res['data']['code']==200){
          this.setData({
            drinksInfo: res['data']['data']            
          })
          console.log(this.data.drinksInfo)
          this.setData({
            drinksInfoLoaded: true
          })
        }
      }
    })
  }
})