import React from 'react';
import Calendar from "../../../components/calendar/Calendar";
import { RatingData, LeaderboardEntry } from "../../../interfaces/interfaces";

const leaderboardData: LeaderboardEntry[] = [
  { name: 'Єрошенко Текля', points: 3736, imageUrl: '' },
  { name: 'Житецький Домослав', points: 3668, imageUrl: '' },
  { name: 'Жаліло Корнилій', points: 3647, imageUrl: '' },
  { name: 'Вагилевич Устим', points: 3297, imageUrl: '' },
  { name: 'Думка Харита', points: 3086, imageUrl: '' },
  { name: 'Леонтович Таїсія', points: 2998, imageUrl: '' },
  { name: 'Зеленецький Щастибог', points: 2966, imageUrl: '' },
  { name: 'Ульяненко Устим', points: 2762, imageUrl: '' },
];

const ratingData: RatingData = {
  groupRating: 12,
  streamRating: 20,
  individualWork: {
    completed: 5,
    inProgress: 7,
  },
  averageScore: 10.5,
  individualScore: 9.7,
  classWorkScore: 11.3,
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <Calendar />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-96">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Огляд успішності студентів</h1>
        </header>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Таблиця лідерів</h2>
          <ul className="mt-2">
            {leaderboardData.map((entry, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center">
                  <span className="text-gray-800 font-medium">{entry.name}</span>
                </div>
                <span className="text-gray-600">{entry.points} балів</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Загальний прогрес:</h2>
          <div className="mt-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Середній бал класу:</span>
              <span className="text-gray-800 font-medium">{ratingData.averageScore}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Індивідуальний прогрес:</span>
              <div className="flex justify-between py-1">
                <span className="text-gray-800">{`Самостійна робота: ${ratingData.individualScore}`}</span>
                <span className="text-gray-800">{`Робота в класі: ${ratingData.classWorkScore}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;