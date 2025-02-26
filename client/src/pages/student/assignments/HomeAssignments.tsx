import React from 'react';
import { Select } from 'antd';
import { SearchProps } from 'antd/es/input';
import { Input } from 'antd';

const { Search } = Input;

const homeAssignments: React.FC = () => {

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const imageHolder = './images/elementor-placeholder-image.jpg'

  const data = [
    {
      title: "Sprint Planning",
      dateVisible: "19.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Ganache",
      dateVisible: "14.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Truffle",
      dateVisible: "12.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Git Branching",
      dateVisible: "10.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "User Stories",
      dateVisible: "07.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Sprint Planning",
      dateVisible: "05.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Solidity",
      dateVisible: "03.02.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Smart Contracts",
      dateVisible: "31.01.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Start Sprint",
      dateVisible: "29.01.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },
    {
      title: "Team Project Start",
      dateVisible: "27.01.2025",
      deadline: "21.02.2025 1 день",
      image: imageHolder,
    },

  ];

  return (
    <div className='bg-gray-100 min-h-full'>
    <div className="p-6">
      <div className="flex mb-4">
        <button className="border rounded-md p-2 hover:bg-custom-blue mr-2">
          До виконання
        </button>
        <button className="border rounded-md p-2 hover:bg-custom-blue mr-2">
          На перевірці
        </button>
        <button className="border rounded-md p-2 hover:bg-custom-blue">
          Виконані
        </button>
      </div>


      <div className="flex mb-4">
        <Search placeholder="Пошук" className='w-80' onSearch={onSearch} />
        <Select
          showSearch
          placeholder="Предмет"
          className='ml-3'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: '1', label: 'Fintech' },
            { value: '2', label: 'Python' },
            { value: '3', label: 'ASP.NET' },
          ]}
        />
      </div>


      <div className="grid grid-cols-5 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-4 bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.title}
              className="rounded-md w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">Видано: {item.dateVisible}</p>
            <p className="text-gray-600">Дедлайн: {item.deadline}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default homeAssignments;