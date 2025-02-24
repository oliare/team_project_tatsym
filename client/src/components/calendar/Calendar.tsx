import React, { useState } from 'react';
import { Calendar, Button, Modal, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const daysOfWeek = [
  { label: 'Пн', value: 1 },
  { label: 'Вт', value: 2 },
  { label: 'Ср', value: 3 },
  { label: 'Чт', value: 4 },
  { label: 'Пт', value: 5 },
  { label: 'Сб', value: 6 },
  { label: 'Нд', value: 0 },
];

const ScheduleCalendar: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleDaySelect = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const fullCellRender = (value: Dayjs) => {
    const isCurrentMonth = value.month() === currentDate.month();
    if (!isCurrentMonth) return <div className="h-6 w-6"></div>; 

    const isSelected = selectedDays.includes(value.day());
    const isToday = value.isSame(dayjs(), 'day');

    return (
      <div
        className={`flex items-center justify-center h-6 w-6 border border-gray-300 rounded text-xs ${
          isSelected ? 'bg-green-300 text-black font-bold' : ''
        } ${isToday ? 'bg-blue-200 font-bold' : ''}`}
      >
        {value.date()}
      </div>
    );
  };

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  return (
    <div className="absolute right-0 top-20 w-1/5 bg-gray-100 p-4 shadow-lg overflow-y-auto">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="flex-1 text-center font-semibold text-sm">{currentDate.format('MMM YYYY')}</span>
        <div className="flex gap-2">
          <Button size="small" icon={<LeftOutlined />} onClick={handlePrevMonth} />
          <Button size="small" icon={<RightOutlined />} onClick={handleNextMonth} />
        </div>
      </div>

      <Calendar
        fullscreen={false}
        value={currentDate}
        onPanelChange={setCurrentDate}
        fullCellRender={fullCellRender}
        headerRender={() => null}
        className="border border-gray-300 rounded max-w-full max-h-[60vh]"
      />

      <Button type="primary" onClick={showModal} className="mt-2 w-full" size="small">
        Вибрати дні
      </Button>

      <Modal title="Вибрати дні занять" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Space wrap>
          {daysOfWeek.map((day) => (
            <Button
              key={day.value}
              type={selectedDays.includes(day.value) ? 'primary' : 'default'}
              onClick={() => handleDaySelect(day.value)}
              size="small"
            >
              {day.label}
            </Button>
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export default ScheduleCalendar;
