import React, { useEffect, useState } from 'react';
import Calendar from "../../../components/calendar/Calendar";
import { RatingData } from "../../../interfaces/interfaces";
import { getStudents } from "../../../api/users/userProfileApi"; 

const ratingData: RatingData = {
  groupRating: 12,
  streamRating: 20,
  individualWork: {
    completed: 5,
    inProgress: 1, 
    overdue: 0, 
  },
  averageScore: 10.5,
  individualScore: 9.7,
  classWorkScore: 11.3,
};

const App: React.FC = () => {
  const [students, setStudents] = useState<{ name: string, score: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentData = await getStudents(); 
        const baseScore = 3762; 
        
        const studentNamesWithScores = studentData.map((student, index) => {
          const score = baseScore - (index * 339); 
          return { name: student.firstName + " " + student.lastName, score };
        });
        
        setStudents(studentNamesWithScores);
      } catch (err) {
        setError("Failed to fetch students.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-full bg-gray-100 p-6 flex">
      <div className="w-2/3 flex gap-4 h-[480px]">
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Огляд успішності студентів</h1>
          <div className="bg-white shadow-sm rounded-lg p-4 my-4">
            <h2 className="text-lg font-semibold text-gray-800">Самостійна робота</h2>
            <div className="mt-3">
              <div className="bg-blue-100 text-blue-800 rounded-lg p-2 flex justify-between">
                <span>До виконання</span>
                <span className="font-bold">{ratingData.individualWork.inProgress}</span>
              </div>
              <div className="bg-red-100 text-red-800 rounded-lg p-2 flex justify-between mt-2">
                <span>Прострочені</span>
                <span className="font-bold">{ratingData.individualWork.overdue}</span>
              </div>
            </div>
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

        <div className="w-1/2 bg-white shadow-md rounded-lg p-4 h-[480px]">
          <h2 className="text-xl font-semibold text-gray-700">Список студентів</h2>
          <ul className="mt-2">
            {students.map((student, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <span className="text-gray-800 font-medium">{student.name}</span>
                <span className="text-gray-800 font-medium">{student.score}</span> 
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-start">
        <Calendar />
      </div>
    </div>
  );
};

export default App;
