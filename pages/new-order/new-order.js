Page({
  data: {
    
  },
  
  onLoad: function(options) {
    // 页面加载时执行
  },
  
  // 返回主菜单
  backToMain: function() {
    wx.navigateBack({
      delta: 1
    });
  }
}) 