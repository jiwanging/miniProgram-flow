// pages/more-movie/more-movie.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieType:'',
    _currentCount:0,
    serverRes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // console.log('more movie:'+option.currentTarget.dataset.type)
    console.log(option.movieType)
    this.getMoreMovie(option.movieType);
  },

  /**
 * 获取更多上映
 */
getMoreMovie(movieType){
  this.data.movieType = movieType;
  const that = this;
  switch(movieType){
    case 'hotMovie':this.sendRequestForMoreMovie(1);break
    case 'comingMovie':this.sendRequestForMoreMovie(5);break
    case 'rangeMovie':this.sendRequestForMoreMovie(10);break
  }
  
},
/**
 * 发送请求 向服务器请求更多电影数据
 */
sendRequestForMoreMovie(start){
  const that = this;
  const temp = start;
  wx.request({
    url: app.globalData.gBaseUrl+'/in_theaters',
    data:{
      start:0,
      count:12
    },
    success(res){
      that.setData({
        serverRes:that.data.serverRes.concat(res.data.subjects),
        _currentCount:6+12
      });
      console.log(that.data.serverRes)
    }
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '';
    switch(this.data.movieType){
      case 'hotMovie':title="正在热映";break
      case 'comingMovie':title="即将上映";break
      case 'rangeMovie':title="经典电影";break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 跳转至电影详情界面
   */
  onGoToDetail(option){
    console.log('option',option);
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail',
    })
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
    console.log('用户进行了下拉');
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('用户进行了上拉');
    const currentCount = this.data.currentCount + 6;
    this.data._currentCount = currentCount;
    this.sendRequestForMoreMovie(currentCount);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})