import React, { useState, useEffect, useRef } from 'react';
import { Material } from '../../../interfaces/interfaces';

const UserMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'theme' | 'id'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); 
  const containerRef = useRef<HTMLDivElement>(null);

  const mockMaterials: Material[] = [ 
    { id: 1, title: 'React Basics', description: 'Introduction to React', date: '2023-10-01', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, title: 'TypeScript Advanced', description: 'Deep dive into TypeScript', date: '2023-09-15', theme: 'Frontend' },
    { id: 3, title: 'State Management', description: 'Managing state in React', date: '2023-10-05', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Node.js Basics', description: 'Introduction to Node.js', date: '2023-08-20', theme: 'Backend' },
    { id: 5, title: 'REST API Design', description: 'Best practices for REST APIs', date: '2023-09-10', theme: 'Backend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 6, title: 'Docker for Beginners', description: 'Getting started with Docker', date: '2023-07-25', theme: 'DevOps' },
    { id: 7, title: 'Kubernetes Basics', description: 'Introduction to Kubernetes', date: '2023-06-30', theme: 'DevOps', imageUrl: 'https://via.placeholder.com/100' },
    { id: 8, title: 'React Basics', description: 'Introduction to React', date: '2023-10-01', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 9, title: 'TypeScript Advanced', description: 'Deep dive into TypeScript', date: '2023-09-15', theme: 'Frontend' },
    { id: 10, title: 'State Management', description: 'Managing state in React', date: '2023-10-05', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 11, title: 'Node.js Basics', description: 'Introduction to Node.js', date: '2023-08-20', theme: 'Backend' },
    { id: 12, title: 'REST API Design', description: 'Best practices for REST APIs', date: '2023-09-10', theme: 'Backend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 13, title: 'Docker for Beginners', description: 'Getting started with Docker', date: '2023-07-25', theme: 'DevOps' },
    { id: 14, title: 'Kubernetes Basics', description: 'Introduction to Kubernetes', date: '2023-06-30', theme: 'DevOps', imageUrl: 'https://via.placeholder.com/100' },
    { id: 15, title: 'React Basics', description: 'Introduction to React', date: '2023-10-01', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 16, title: 'TypeScript Advanced', description: 'Deep dive into TypeScript', date: '2023-09-15', theme: 'Frontend' },
    { id: 17, title: 'State Management', description: 'Managing state in React', date: '2023-10-05', theme: 'Frontend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 18, title: 'Node.js Basics', description: 'Introduction to Node.js', date: '2023-08-20', theme: 'Backend' },
    { id: 19, title: 'REST API Design', description: 'Best practices for REST APIs', date: '2023-09-10', theme: 'Backend', imageUrl: 'https://via.placeholder.com/100' },
    { id: 20, title: 'Docker for Beginners', description: 'Getting started with Docker', date: '2023-07-25', theme: 'DevOps' },
    { id: 21, title: 'Kubernetes Basics', description: 'Introduction to Kubernetes', date: '2023-06-30', theme: 'DevOps', imageUrl: 'https://via.placeholder.com/100' },
  ];

  useEffect(() => {
    setMaterials(mockMaterials);
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (containerRef.current) {
        const itemsInRow = 6;
        const maxRows = 2;
        const maxItems = itemsInRow * maxRows;
        setItemsPerPage(maxItems);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const sortedMaterials = [...materials].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'theme') {
      return (a.theme || '').localeCompare(b.theme || '');
    } else if (sortBy === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = sortedMaterials.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div ref={containerRef} className="w-full min-h-full p-5 bg-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <label className="font-bold">Sort by:</label>
        <select 
          className="p-2 text-lg border border-gray-300 rounded-md"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as 'id' | 'title' | 'theme' | 'date')}
        >
          <option value="id">ID</option>
          <option value="date">Date</option>          
          <option value="title">Title</option>
          <option value="theme">Theme</option>
        </select>
      </div>

      <ul className="grid grid-cols-6 gap-4">
        {currentMaterials.map((material) => (
          <li key={material.id} className="bg-white border rounded-md p-4 flex flex-col items-center text-center shadow-md">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md mb-2">
              {material.imageUrl ? (
                <img src={material.imageUrl} alt={material.title} className="w-full h-full rounded-md" />
              ) : (
                'No Image'
              )}
            </div>
            <h2 className="text-lg font-semibold text-blue-500">{material.title}</h2>
            <p className="text-gray-600">{material.description}</p>
            <small className="text-gray-500">Date: {new Date(material.date).toLocaleDateString()}</small>
            {material.theme && <small className="text-gray-500">Theme: {material.theme}</small>}
            <small className="text-gray-500">ID: {material.id}</small>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: Math.ceil(sortedMaterials.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 text-white rounded-md ${currentPage === i + 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
            onClick={() => paginate(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserMaterials;
