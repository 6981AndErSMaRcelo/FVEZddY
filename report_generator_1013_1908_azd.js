// 代码生成时间: 2025-10-13 19:08:21
const fs = require('fs');
const path = require('path');

// 导入Gatsby API
const { graphql, Link } = require('gatsby');

// 定义一个函数，用于创建报表文件
const createReport = async (reportData) => {
  try {
    // 检查reportData是否有效
    if (!reportData || typeof reportData !== 'object') {
      throw new Error('Invalid report data provided.');
    }

    // 创建一个报表文件的路径
    const reportPath = path.join('public', 'reports', 'report.pdf');

    // 将报表数据写入文件
    fs.writeFileSync(reportPath, JSON.stringify(reportData), 'utf8');

    console.log('Report generated successfully:', reportPath);
  } catch (error) {
    // 处理任何在生成报表过程中发生的错误
    console.error('Error generating report:', error.message);
  }
};

// Gatsby页面组件
module.exports = graphql(
  """
  query {
    allDataYaml {
      edges {
        node {
          reportTitle
          data
        }
      }
    }
  }
  """,
  {
    limit: 100,
  }
) => {
  return {
    // 定义组件函数
    render: (data) => {
      // 检查数据是否有效
      if (data.error) {
        console.error('Error fetching data:', data.error);
        return;
      }

      // 获取数据并生成报表
      const { allDataYaml } = data.data;
      const reportData = allDataYaml.edges.map(edge => edge.node);

      // 调用createReport函数生成报表
      createReport(reportData);

      // 渲染报表链接
      return (
        <div>
          <Link to="/report">View Report</Link>
        </div>
      );
    },
  };
};

// 注意：
// 1. 确保'allDataYaml'查询与您的数据结构匹配。
// 2. 请在Gatsby项目中安装所需的依赖项，如'fs'和'path'。
// 3. 数据文件应存储在'data'目录中，并以'.ym'或'.yaml'格式保存。
// 4. 此代码示例仅生成一个简单的JSON报告。
//   如需生成更复杂的报告（如PDF），您可能需要使用其他库（如'jsPDF'）。