// 代码生成时间: 2025-09-19 16:31:35
const crypto = require('crypto');

// 用户数据库模拟
const usersDb = {
  'user1': {
    username: 'user1',
    password: 'password1',
  },
  'user2': {
    username: 'user2',
    password: 'password2',
  },
};

// 验证函数
function authenticateUser(username, password) {
  // 检查用户名是否存在
  if (!usersDb.hasOwnProperty(username)) {
    return {
      success: false,
      message: '用户名不存在。',
    };
  }

  // 检查密码是否匹配
  const user = usersDb[username];
  const isPasswordMatch = user.password === password;
  if (!isPasswordMatch) {
    return {
      success: false,
      message: '密码错误。',
    };
  }

  // 如果验证成功，返回成功消息
  return {
    success: true,
    message: '登录成功。',
  };
}

// 加密密码函数，用于在用户注册时加密密码
function encryptPassword(password) {
  // 使用crypto模块的createHash函数来创建一个哈希
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

// 模块导出
module.exports = {
  authenticateUser,
  encryptPassword,
};