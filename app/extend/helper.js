const sd = require('silly-datetime');

// 格式化时间
module.exports = {
  formatTime(time) {
    return sd.format(new Date(time), 'YYYY-MM-DD HH:mm');
  },
};
