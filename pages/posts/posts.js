// pages/posts/posts.js
import { local_data } from "../../data/data.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:{
      name:'hello',
      age:'18'
    }
  },
/**
 * 点击跳转至详情界面
 */
showPostDetail:function(event){
  console.log(event);
  console.log('id等于'+event.currentTarget.dataset.id);
  const pid = event.currentTarget.dataset.id;
  wx.navigateTo({
    url: '/pages/post-detail/post-detail?postId='+pid
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData(content);
    this.setData({
      posts:local_data
    });
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