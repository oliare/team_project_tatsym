import React, { useState } from 'react';
import { Calendar, Button, Modal, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import style from "./Calendar.module.css"; 

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
      return <div className={style.emptyCell}></div>;
    }

    const isSelected = selectedDays.includes(value.day());
    const isToday = value.isSame(dayjs(), 'day');

    return (
      <div
        className={`${style.calendarDay} ${isSelected ? style.selectedDay : ''} ${
          isToday ? style.today : ''
        }`}
      >
        {value.date()}
      </div>
    );
  };

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  return (
    <div className={style.calendarContainer}>
      <div className={style.header}>
        <span className={style.monthLabel}>{currentDate.format('MMMM YYYY')}</span>
        <div className={style.navigationButtons}>
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
        className={style.calendarContent}
      />

      <Button type="primary" onClick={showModal} className={style.selectButton}>
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
