Page({
  data: {
    orderList: [
      {
        id: 1,
        orderTime: '2025-03-30',
        company: '美的公司',
        status: '已配'
      },
      {
        id: 2,
        orderTime: '2025-03-31',
        company: '华为公司',
        status: '草稿'
      },
      {
        id: 3,
        orderTime: '2025-03-32',
        company: '阿里公司',
        status: '待确认'
      }
    ]
  },
  
  onLoad: function(options) {
    // 页面加载时执行，可以从options中获取传递的参数
  },
  
  // 返回主菜单
  backToMain: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  
  // 查看订单详情
  viewOrderDetail: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    // 暂时跳转到空白页，传递订单ID
    wx.navigateTo({
      url: `../blank/blank?type=orderDetail&id=${orderId}`
    });
  },
  
  // 创建新订单
  createNewOrder: function() {
    // 暂时跳转到空白页
    wx.navigateTo({
      url: '../blank/blank?type=newOrder'
    });
  }
}) 