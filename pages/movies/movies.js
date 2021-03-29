// pages/movies/movies.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serverRes_hot:[],
    serverRes_coming:[],
    serverRes_range:[],
    searchInfo:[],
    isSearch:false,
    comedInfo:[
      {name:'赫本传记' , image:'/image/movie/movie1.png',score:'4.2'},
      {name:'一条狗的使命' , image:'/image/movie/movie2.png',score:'4.5'},
      {name:'美丽人生' , image:'/image/movie/movie3.png',score:'4.7'}
    ],
    comingInfo:[
      {name:'赫本传记' , image:'/image/movie/movie1.png',score:'4.2'},
      {name:'一条狗的使命' , image:'/image/movie/movie2.png',score:'4.5'},
      {name:'美丽人生' , image:'/image/movie/movie3.png',score:'4.7'}
    ],
    rangInfo:[
      {name:'赫本传记' , image:'/image/movie/movie1.png',score:'4.2'},
      {name:'一条狗的使命' , image:'/image/movie/movie2.png',score:'4.5'},
      {name:'美丽人生' , image:'/image/movie/movie3.png',score:'4.7'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotMovie();
    this.getComingMovie();
    this.getRangeMovie();
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
 * 获取正在待上映
 */
getComingMovie(){
  const that = this;
  wx.request({
    url: app.globalData.gBaseUrl+'/in_theaters?start=3&count=3',
    success(res){
      that.setData({
        serverRes_coming:res.data.subjects
      });
      console.log(that.data.serverRes_coming)
    }
  });
},
/**
 * 获取正在待上映
 */
getRangeMovie(){
  const that = this;
  wx.request({
    url: app.globalData.gBaseUrl+'/in_theaters?start=6&count=3',
    success(res){
      that.setData({
        serverRes_range:res.data.subjects
      });
      console.log(that.data.serverRes_range)
    }
  });
},
/**
 * 查看更多电影
 */
onMoreMovie(option){
  const movieType = option.currentTarget.dataset.type;
  console.log(option.currentTarget.dataset.type)
  wx.navigateTo({
    url: '/pages/more-movie/more-movie?movieType='+movieType,
  })
},
/**
 * 确认搜索函数
 */
onConfirm(event){
  console.log(event.detail.value);
  const that = this;
  wx.request({
    url: app.globalData.gBaseUrl+'/search',
    data:{
      q:event.detail.value
    },
    success(res){
      console.log('以下为res：');
      console.log(res);
      that.setData({
        searchInfo:res.data.subjects,
        isSearch:true
      })
    }
  });
},
/**
 * 取消搜索结果显示
 */
onCancelSearch(){
  this.setData({
    isSearch:false
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