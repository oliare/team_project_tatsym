import React, { useState, useEffect, useRef } from 'react';
import style from "./userMaterials.module.css"
import {Material} from "../../../interfaces/interfaces"

const UserMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'theme' | 'id'>('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); 
  const containerRef = useRef<HTMLDivElement>(null);



  //Test material
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
        const containerWidth = containerRef.current.offsetWidth; 
        const itemWidth = 220; 
        const itemsInRow = Math.floor(containerWidth / itemWidth); 
        const maxRows = 2; 
        const maxItems = itemsInRow * maxRows; 
        setItemsPerPage(maxItems || 8);
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
    <div ref={containerRef} className={`${style.materialsContainer}`}>
      <div className={`${style.sortContainer}`}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'id' | 'title' | 'theme' | 'date')}>
          <option value="id">ID</option>
          <option value="date">Date</option>          
          <option value="title">Title</option>
          <option value="theme">Theme</option>

        </select>
      </div>

      <ul className={`${style.materialsList}`}>
        {currentMaterials.map((material) => (
          <li key={material.id}>
            <div className={`${style.materialImage}`}>
              {material.imageUrl ? (
                <img src={material.imageUrl} alt={material.title} width={100} height={100} style={{ borderRadius: '5px' }} />
              ) : (
                'No Image'
              )}
            </div>
            <div className={`${style.materialContent}`}>
              <h2>{material.title}</h2>
              <p>{material.description}</p>
              <small>Date: {new Date(material.date).toLocaleDateString()}</small>
              {material.theme && <small>Theme: {material.theme}</small>}
              <small>ID: {material.id}</small>
            </div>
          </li>
        ))}
      </ul>

      <div className={`${style.pagination}`}>
        {Array.from({ length: Math.ceil(sortedMaterials.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
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
