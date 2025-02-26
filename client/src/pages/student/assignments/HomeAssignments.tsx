import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { SearchProps } from 'antd/es/input';
import { Input, Modal, Button } from 'antd';
import { getAllHomeworks } from '../../../api/homeworks/homeworksApi';
import { IHomeworkDto } from '../../../interfaces/homeworks';
import { API_URL_IMAGES } from "../../../api/api";
import { Assignment } from "../../../interfaces/interfaces";

const { Search } = Input;
const imageHolder = './images/elementor-placeholder-image.jpg'

const HomeAssignments: React.FC = () => {

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const [homeworks, setHomeworks] = useState<IHomeworkDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    const fetchHomeworks = async () => {
      const data = await getAllHomeworks();
      if (data) { setHomeworks(data); }
    };
    fetchHomeworks();
  }, []);  

  const showModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleSend = () => {
    console.log("Input Value:", inputValue);
    setIsModalOpen(false);
  };

  return (
    <div className='bg-gray-100 min-h-full'>
    <div className="p-6">
      <div className="flex mb-4">
        <button className="border rounded-md p-2 hover:bg-custom-blue mr-2">До виконання</button>
        <button className="border rounded-md p-2 hover:bg-custom-blue mr-2">На перевірці</button>
        <button className="border rounded-md p-2 hover:bg-custom-blue">Виконані</button>
      </div>

      <div className="flex mb-4">
        <Search placeholder="Пошук" className='w-80' onSearch={onSearch} />
        <Select
          showSearch
          placeholder="Предмет"
          className='ml-3'
          filterOption={(input, option) =>
            (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: '1', label: 'Fintech' },
            { value: '2', label: 'Python' },
            { value: '3', label: 'ASP.NET' },
          ]}
        />
      </div>

      <div className="grid grid-cols-5 gap-6">
        {homeworks.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-4 bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => showModal(item)}
          >
            <img
              src={`${API_URL_IMAGES}/${item.logo}` || imageHolder}
              alt={item.title}
              className="rounded-md w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">Видано: {new Date(item.issuedDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Дедлайн: {new Date(item.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <Modal title={selectedAssignment?.title} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <p>Видано: {selectedAssignment?.dateVisible}</p>
        <p>Дедлайн: {selectedAssignment?.deadline}</p>
        <p>Деталі домашнього завдання...</p>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Введіть відповідь..." className="mb-2" />
        <Button type="primary" onClick={handleSend}>Send</Button>
      </Modal>
    </div>
    </div>
  );
};

export default HomeAssignments;