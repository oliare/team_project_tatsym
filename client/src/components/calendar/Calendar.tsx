import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const daysOfWeek = [
  { label: "Пн", value: 1 },
  { label: "Вт", value: 2 },
  { label: "Ср", value: 3 },
  { label: "Чт", value: 4 },
  { label: "Пт", value: 5 },
  { label: "Сб", value: 6 },
  { label: "Нд", value: 0 },
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

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, "month"));

  const generateCalendarDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfWeek = startOfMonth.day(); 

    const days = [];

    for (let i = 0; i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = startOfMonth.date(day);
      const isSelected = selectedDays.includes(date.day());
      const isToday = date.isSame(dayjs(), "day");

      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center border rounded ${
            isSelected ? "bg-green-300 text-black font-bold" : ""
          } ${isToday ? "bg-blue-200 font-bold" : ""}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="absolute right-0 top-20 w-1/5 bg-gray-50 p-4 shadow-lg overflow-y-auto">
      <div className="flex items-center justify-between w-full mb-2">
        <span className="flex-1 text-center font-semibold text-sm">
          {currentDate.format("MMMM YYYY")}
        </span>
        <div className="flex gap-2">
          <Button size="small" icon={<LeftOutlined />} onClick={handlePrevMonth} />
          <Button size="small" icon={<RightOutlined />} onClick={handleNextMonth} />
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold mb-1">
        {daysOfWeek.map((day) => (
          <div key={day.value} className="w-10 h-6">
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>

      <Button type="primary" onClick={showModal} className="mt-2 w-full" size="small">
        Вибрати дні
      </Button>

      <Modal title="Вибрати дні занять" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Space wrap>
          {daysOfWeek.map((day) => (
            <Button
              key={day.value}
              type={selectedDays.includes(day.value) ? "primary" : "default"}
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
