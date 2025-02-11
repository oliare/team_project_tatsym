import React from 'react';
import './Home.css';

interface LeaderboardEntry {
  name: string;
  points: number;
  imageUrl: string;
}

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

interface RatingData {
  groupRating: number;
  streamRating: number;
  individualWork: {
    completed: number;
    inProgress: number;
  };
  averageScore: number;
  individualScore: number;
  classWorkScore: number;
}

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
    <div className="container">
      <header className="header">
        <h1>Огляд успішності студентів</h1>
      </header>
      <div className="leaderboard-section">
        <h2>Таблиця лідерів</h2>
        <ul className="leaderboard">
          {leaderboardData.map((entry, index) => (
            <li key={index} className="leaderboard-entry">
              <div className="leaderboard-info">
                <span className="leaderboard-name">{entry.name}</span>
                <span className="leaderboard-points">{entry.points} балів</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="progress-section">
        <h2>Загальний прогрес:</h2>
        <div className="progress">
          <div className="progress-item">
            <span>Середній бал класу:</span>
            <span>{ratingData.averageScore}</span>
          </div>
          <div className="progress-item">
            <span>Індивідуальний прогрес:</span>
            <div>
              <span>Самостійна робота: {ratingData.individualScore}</span>
              <span>&nbsp;Робота в класі: {ratingData.classWorkScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 