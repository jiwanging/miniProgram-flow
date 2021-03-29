// pages/post-detail/post-detail.js
import { local_data, musicArray} from "../../data/data.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false,
    _postId:0,
    post_collectedSta:{},
    musicInfo:[],
    isPlay:false,
    mgr:''
  },
/**
 * 更改收藏与否的状态 
 */
onChangeCollectedStatus:function(){
  //提示信息
  wx.showToast({
    title: this.data.collected?'取消收藏':'收藏成功',
  })
  let currentSta = !this.data.collected;
  this.data.post_collectedSta[this.data._postId] = currentSta;
  wx.setStorageSync('post_collectedSta', this.data.post_collectedSta);
    this.setData({
      collected:currentSta
    })
},
/**
 * 实现分享的功能
 */
OnShare:function(){
  wx.showActionSheet({
    itemList:['分享到微信','分享到QQ','分享到微博'],
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('postId is'+options.postId);
    const postId = options.postId;
    console.log(local_data[postId]);
    const info = local_data[postId];
    this.setData(info);
    //进行收藏相关逻辑的初始化
    this.data._postId = postId;
    this.data.post_collectedSta = wx.getStorageInfoSync('post_collectedSta');
    console.log('post_collectedSta:'+this.data.post_collectedSta);
    const currentCollected = this.data.post_collectedSta[this.data._postId];
    console.log('this._postId:'+this.data._postId);
    console.log('currentCollected:'+currentCollected);
    if(currentCollected === undefined){
      this.collected = false;
    }else{
      this.setData({
        collected:currentCollected
      })
    }
    //音乐数据绑定
    this.data.musicInfo = musicArray;
    this.data.mgr = wx.getBackgroundAudioManager();
    const currentIsPlay = app.globalData.globalIsPlay;
    this.setData({
      isPlay:currentIsPlay
    });
    //用于同步微信自带按钮和自定义图片按钮的关系
    this.data.mgr.onPlay(this.onMusic);//监听音乐播放
    this.data.mgr.onPause(this.onMusicPause);//监听音乐停止
    
  },

  /**
   * 音乐播放事件
   */
  onMusic:function(){
    console.log('音乐播放开始...');
    this.setData({
      isPlay:true
    });
    app.globalData.globalIsPlay = this.data.isPlay;
    this.data.mgr.src = this.data.musicInfo[this.data._postId].url;
    this.data.mgr.title = this.data.musicInfo[this.data._postId].title;
    this.data.mgr.coverImgUrl= this.data.musicInfo[this.data._postId].img;
  },

  onMusicPause(){
    console.log('音乐播放停止...');
    this.setData({
      isPlay:false
    });
    app.globalData.globalIsPlay = this.data.isPlay;
    this.data.mgr.pause();
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