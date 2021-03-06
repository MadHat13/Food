// pages/flist/flist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dz: '/images/sc.png',
    test:[],
    content:[],
    up:{},
    collect: ['../../images/collect.png', '../../images/collection.png'],
    collect_choose:0
  },
  // goto: function (event) {
  //   console.log(event)
  //   //跳转到详情页面，并且foodid传递过去?foodid=' + event.target.dataset.foodid,
  //   // app.globalData.id = this.data.navList.id
  //   wx.navigateTo({
  //     url: '../search_list/search_list?food_id=' + event.target.dataset.food_id,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  a(id){
    let that = this
    return new Promise((resolve,reject)=>{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'flist_in',
        // 传给云函数的参数
        data: {
          id: id
        },
        success(res) {
          console.log(res)
          that.setData({
            test: res.result.data
          })
          resolve()
        },
        fail: console.error
      })
    })
  },
  b(){
    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'flist_Up',
      // 传给云函数的参数
      data: {
        id: that.data.test[0].Recipe_Up
      },
      success(res) {
        console.log(res);
        that.setData({
          up :{
            Head:res.result.data[0].Head,
            UserName: res.result.data[0].UserName
          }
        })

      },
      fail: console.error
    })
  },
  c(){
    let that =this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'mine',
      data:{
        Recipe:that.data.test[0].Recipe_id
      },
      // 传给云函数的参数
      success(res) {
        console.log(res)
        if(res.result.data.length!=0){
          that.setData({
            collect_choose: 1
          })
        }
        
      },
      fail: console.error
    })
  },
  collection(e){
    console.log(this.data.test[0].Recipe_id)
    let that = this
    if(this.data.collect_choose == 0){
      wx.cloud.callFunction({
        // 云函数名称
        name: 'flist_collection',
        // 传给云函数的参数
        data: {
          id: that.data.test[0].Recipe_id,
          type: 0
        },
        success(res) {
          that.setData({
            collect_choose:1
          })
        },
        fail: console.error
      })
    }else{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'flist_collection',
        // 传给云函数的参数
        data: {
          id: that.data.test[0].Recipe_id,
          type: 1
        },
        success(res) {
          console.log(res)
          that.setData({
            collect_choose: 0
          })
        },
        fail: console.error
      })
    }
     
  },
  onLoad: function (options) {
    console.log(options)
    let that = this;
    this.a(options.food_id).then(success=>{
      console.log()
      that.b()
      that.c()
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

  },
  q(){
    console.log(this.data.up)
  }
})