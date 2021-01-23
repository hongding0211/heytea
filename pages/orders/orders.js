// pages/orders/orders.js

var global = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transactionsInfo: []
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
    this.fetchTransactionsInfo()
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
   * 获取该用户的所有订单信息
   */
  fetchTransactionsInfo: function () {
    wx.login({
      success: loginRes => {
        wx.request({
          url: global.globalData.serverURL + '/getTransactionDetail/',
          data: { code: loginRes.code },
          success: res=>{
            if(res['data']['code']==200){
              this.setData({
                transactionsInfo: res['data']['data']
              })
              console.log(this.data.transactionsInfo)
            }
          }
        })
      }
    })
  }
})