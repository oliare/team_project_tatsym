import React, { useState } from 'react';
import { Calendar, Button, Modal, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Calendar.css'; 

const daysOfWeek = [
  { label: 'Понеділок', value: 1 },
  { label: 'Вівторок', value: 2 },
  { label: 'Середа', value: 3 },
  { label: 'Четвер', value: 4 },
  { label: 'Пʼятниця', value: 5 },
  { label: 'Субота', value: 6 },
  { label: 'Неділя', value: 0 },
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

    if (!isCurrentMonth) {
      return <div className="empty-cell"></div>;
    }

    const isSelected = selectedDays.includes(value.day());
    const isToday = value.isSame(dayjs(), 'day');

    return (
      <div
        className={`calendar-day ${isSelected ? 'selected-day' : ''} ${
          isToday ? 'today' : ''
        }`}
      >
        {value.date()}
      </div>
    );
  };

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  return (
    <div className="custom-calendar-container p-4 bg-grey rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold flex-1 text-center">
          {currentDate.format('MMMM YYYY')}
        </span>
        <div className="flex gap-2">
          <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
          <Button icon={<RightOutlined />} onClick={handleNextMonth} />
        </div>
      </div>

      <Calendar
        fullscreen={false}
        value={currentDate}
        onPanelChange={setCurrentDate}
        fullCellRender={fullCellRender}
        headerRender={() => null}
        className="calendar-content"
      />

      <Button type="primary" onClick={showModal} className="mb-2 w-full">
        Вибрати дні
      </Button>

      <Modal title="Вибрати дні занять" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Space wrap>
          {daysOfWeek.map((day) => (
            <Button
              key={day.value}
              type={selectedDays.includes(day.value) ? 'primary' : 'default'}
              onClick={() => handleDaySelect(day.value)}
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