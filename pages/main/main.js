Page({
  data: {
    inputValue: '',
    isLoggedIn: false,
    messages: [],
    scrollToMessage: '',
    messageId: 0
  },
  
  onLoad: function() {
    // 检查登录状态
    this.checkLoginStatus();
  },
  
  // 检查登录状态
  checkLoginStatus: function() {
    // 这里模拟登录状态检查，实际项目中应该从服务器获取
    const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    this.setData({
      isLoggedIn: isLoggedIn
    });
    
    // 显示欢迎消息
    setTimeout(() => {
      if (isLoggedIn) {
        this.addMessage('欢迎光临振发商行，我是您的AI助手小小酱，您可以直接和我说您的需求，也可以点击我上方的功能模块哦。', 'ai');
      } else {
        this.addMessage('您还没有登录，请先登录一下。', 'ai');
        // 模拟用户登录（实际项目中应该跳转到登录页）
        setTimeout(() => {
          wx.setStorageSync('isLoggedIn', true);
          this.setData({
            isLoggedIn: true
          });
          this.addMessage('登录成功！', 'ai');
          this.addMessage('欢迎光临振发商行，我是您的AI助手小小酱，您可以直接和我说您的需求，也可以点击我上方的功能模块哦。', 'ai');
        }, 2000);
      }
    }, 500);
    
    // 加载历史消息
    this.loadHistoryMessages();
  },
  
  // 加载历史消息
  loadHistoryMessages: function() {
    const historyMessages = wx.getStorageSync('chatMessages') || [];
    if (historyMessages.length > 0) {
      this.setData({
        messages: historyMessages,
        messageId: historyMessages[historyMessages.length - 1].id + 1
      });
      
      // 滚动到最后一条消息
      this.setData({
        scrollToMessage: `msg-${historyMessages[historyMessages.length - 1].id}`
      });
    }
  },
  
  // 添加新消息
  addMessage: function(content, type) {
    const { messages, messageId } = this.data;
    const newMessage = {
      id: messageId,
      content: content,
      type: type,
      time: new Date().getTime()
    };
    
    const newMessages = [...messages, newMessage];
    
    // 只保留最近15条消息
    const limitedMessages = newMessages.slice(-15);
    
    this.setData({
      messages: limitedMessages,
      messageId: messageId + 1,
      scrollToMessage: `msg-${newMessage.id}`
    });
    
    // 保存到本地存储
    wx.setStorageSync('chatMessages', limitedMessages);
    
    // 如果是用户消息，模拟AI回复
    if (type === 'user') {
      setTimeout(() => {
        this.addMessage(`您刚才说的是: ${content}，我正在处理...`, 'ai');
      }, 1000);
    }
  },
  
  // 加载更多历史消息（上滑操作）
  loadMoreMessages: function() {
    wx.showToast({
      title: '已经是全部消息了',
      icon: 'none'
    });
  },
  
  // 导航到空白页面
  navigateTo: function(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `../blank/blank?type=${page}`
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
  
  // 选择图片
  chooseImage: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        // 这里只是模拟选择图片，实际上添加一条图片消息
        this.addMessage('[图片消息]', 'user');
      }
    });
  },
  
  // 选择文件
  chooseFile: function(fileType) {
    // 模拟选择文件，添加一条文件消息
    this.addMessage(`[${fileType}文件]`, 'user');
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
    
    // 添加用户消息
    this.addMessage(this.data.inputValue, 'user');
    
    this.setData({
      inputValue: ''
    });
  }
}) 