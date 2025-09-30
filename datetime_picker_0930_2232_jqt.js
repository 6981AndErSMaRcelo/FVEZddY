// 代码生成时间: 2025-09-30 22:32:05
import React, { useState } from 'react';
# 改进用户体验
import { DatePicker } from 'antd'; // Importing DatePicker from Ant Design

const DateTimePicker = () => {
  // State to store the selected date
# 改进用户体验
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler function to update the selected date
  const handleDateChange = (date, dateString) => {
    if (date) {
# TODO: 优化性能
      setSelectedDate(dateString); // Update the state with the selected date string
    } else {
      setSelectedDate(null); // Reset the state if no date is selected
    }
  };

  // Error handling for empty selection
  const handleEmptySelection = () => {
    console.error('No date selected');
  };

  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        placeholder="Select a date"
        format="YYYY-MM-DD HH:mm"
        allowClear
        disabledDate={(current) => current && current < new Date(new Date() - 86400000)}
        disabledHours={() => [0, 1, 2, 3, 4, 5]} // Disabled hours for example
        onOpen={handleEmptySelection}
      />
      {selectedDate && <div>
        <p>Selected Date: {selectedDate}</p>
      </div>}
    </div>
  );
};

export default DateTimePicker;
# 增强安全性
