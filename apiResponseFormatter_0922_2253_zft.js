// 代码生成时间: 2025-09-22 22:53:04
const axios = require('axios');

/**
 * API响应格式化工具
 * @module apiResponseFormatter
 */

/**
 * 格式化API响应
 * @param {Object} response - API响应对象
 * @param {Object} options - 格式化选项
 * @returns {Object} 格式化后的响应对象
 */
async function formatApiResponse(response, options = {}) {
  // 检查响应对象是否有效
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid API response');
  }

  // 提取响应数据和状态码
  const { data, status } = response;

  // 定义默认的格式化选项
  const defaultOptions = {
    statusKey: 'status',
    messageKey: 'message',
    dataKey: 'data',
  };

  // 合并用户选项和默认选项
  const { statusKey, messageKey, dataKey } = { ...defaultOptions, ...options };

  // 初始化格式化后的响应对象
  let formattedResponse = {};

  try {
    // 根据选项格式化状态码
    if (statusKey) {
      formattedResponse[statusKey] = status;
    }

    // 根据选项格式化消息
    if (messageKey && data && typeof data === 'object' && messageKey in data) {
      formattedResponse[messageKey] = data[messageKey];
    } else if (messageKey) {
      formattedResponse[messageKey] = 'No message available';
    }

    // 根据选项格式化数据
    if (dataKey) {
      formattedResponse[dataKey] = data;
    }

    // 返回格式化后的响应对象
    return formattedResponse;
  } catch (error) {
    // 处理格式化过程中的错误
    console.error('Error formatting API response:', error);
    throw new Error('Failed to format API response');
  }
}

/**
 * 使用axios发送请求并格式化响应
 * @param {string} url - 请求URL
 * @param {Object} options - 请求选项
 * @param {Object} formatOptions - 格式化选项
 * @returns {Promise<Object>} 格式化后的响应对象
 */
async function fetchAndFormat(url, options = {}, formatOptions = {}) {
  try {
    // 发送请求
    const response = await axios.get(url, options);

    // 格式化响应
    return formatApiResponse(response, formatOptions);
  } catch (error) {
    // 处理请求或格式化过程中的错误
    console.error('Error fetching or formatting API response:', error);
    throw error;
  }
}

// 导出函数
module.exports = {
  formatApiResponse,
  fetchAndFormat,
};