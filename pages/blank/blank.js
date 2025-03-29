Page({
  data: {
    pageName: ''
  },
  
  onLoad: function(options) {
    let name = '';
    switch(options.type) {
      case 'order':
        name = '下单';
        break;
      case 'history':
        name = '查询';
        break;
      case 'settings':
        name = '设置';
        break;
      case 'about':
        name = '了解我们';
        break;
      default:
        name = '未知';
    }
    
    this.setData({
      pageName: name
    });
  }
}) 