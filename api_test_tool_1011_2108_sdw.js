// 代码生成时间: 2025-10-11 21:08:38
const axios = require('axios');

// API测试工具
class ApiTestTool {
  
  // 构造函数
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // 发送GET请求
  async get(path, params) {
    try {
      const response = await axios.get(this.baseURL + path, { params });
      return response.data;
    } catch (error) {
      console.error('GET请求失败:', error.message);
      throw error;
    }
  }

  // 发送POST请求
  async post(path, data) {
    try {
      const response = await axios.post(this.baseURL + path, data);
      return response.data;
    } catch (error) {
      console.error('POST请求失败:', error.message);
      throw error;
    }
  }

  // 发送PUT请求
  async put(path, data) {
    try {
      const response = await axios.put(this.baseURL + path, data);
      return response.data;
    } catch (error) {
      console.error('PUT请求失败:', error.message);
      throw error;
    }
  }

  // 发送DELETE请求
  async delete(path) {
    try {
      const response = await axios.delete(this.baseURL + path);
      return response.data;
    } catch (error) {
      console.error('DELETE请求失败:', error.message);
      throw error;
    }
  }

  // 设置请求头
  setHeaders(headers) {
    axios.defaults.headers.common = headers;
  }

  // 设置超时时间
  setTimeout(timeout) {
    axios.defaults.timeout = timeout;
  }
}

// 使用示例
(async () => {
  const apiTestTool = new ApiTestTool('https://api.example.com/');
  
  try {
    // 设置请求头
    apiTestTool.setHeaders({ 'Authorization': 'Bearer YOUR_TOKEN' });
    
    // 设置超时时间
    apiTestTool.setTimeout(5000);
    
    // 发送GET请求
    const responseData = await apiTestTool.get('/users', { limit: 10 });
    console.log('GET响应数据:', responseData);

    // 发送POST请求
    const postData = { name: 'John', age: 30 };
    const postResponseData = await apiTestTool.post('/users', postData);
    console.log('POST响应数据:', postResponseData);

    // 发送PUT请求
    const putData = { name: 'Jane', age: 25 };
    const putResponseData = await apiTestTool.put('/users/1', putData);
    console.log('PUT响应数据:', putResponseData);

    // 发送DELETE请求
    const deleteResponseData = await apiTestTool.delete('/users/2');
    console.log('DELETE响应数据:', deleteResponseData);

  } catch (error) {
    console.error('请求失败:', error.message);
  }
})();