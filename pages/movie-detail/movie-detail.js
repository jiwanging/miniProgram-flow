// pages/movie-detail/movie-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverRes_hot:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotMovie();
  },
  /**
 * 获取正在热映的数据
 */
getHotMovie(){
  const that = this;
  wx.request({
    url: app.globalData.gBaseUrl+'/in_theaters',
    data:{
      start:1,
      count:3
    },
    success(res){
      that.setData({
        serverRes_hot:res.data.subjects
      });
      console.log(that.data.serverRes_hot)
    }
  });
},

/**
 * 放大图片
 */
onLargeView(){
  console.log('触发放大事件')
  wx.previewImage({
    urls: [this.data.serverRes_hot[0].images.large
  ,this.data.serverRes_hot[1].images.large],
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

  }
})