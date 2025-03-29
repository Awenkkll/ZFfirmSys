Page({
  data: {
    inputValue: ''
  },
  
  onLoad: function() {
    
  },
  
  // 导航到空白页面
  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `../blank/blank?type=${page}`
    });
  },
  
  // 选择图片
  chooseImage: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        // 这里只是模拟选择图片，实际上不做任何处理
        wx.showToast({
          title: '已选择图片',
          icon: 'success'
        });
      }
    });
  },
  
  // 显示更多选项
  showMoreOptions: function() {
    wx.showActionSheet({
      itemList: ['上传图片', '上传PDF文件', '上传Excel文件'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0: // 上传图片
            this.chooseImage();
            break;
          case 1: // 上传PDF
            this.chooseFile('pdf');
            break;
          case 2: // 上传Excel
            this.chooseFile('excel');
            break;
        }
      }
    });
  },
  
  // 选择文件
  chooseFile: function(fileType) {
    wx.showToast({
      title: `已选择${fileType}文件`,
      icon: 'success'
    });
  },
  
  // 输入文字时触发
  inputChange: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  
  // 发送消息
  sendMessage: function() {
    if (!this.data.inputValue.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    
    // 这里只是模拟发送消息，实际上不做任何处理
    wx.showToast({
      title: '已发送',
      icon: 'success'
    });
    
    this.setData({
      inputValue: ''
    });
  }
}) 