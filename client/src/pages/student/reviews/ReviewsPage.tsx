
const ReviewsPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-center overflow-hidden">
      <div className="w-full max-w-3xl px-4">
        <h1 className="text-3xl font-bold mb-6 ">Відгуки</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-2xl mx-auto">
          <h2 className="font-bold text-xl mb-2">Викладач, Python Core (10.0.0)</h2>
          <p className="text-gray-600 text-sm mb-2">07.11.2023</p>
          <p className="text-gray-700">
            Учень розумний та дуже активний студент. Він демонструє високий рівень розуміння предмету. 
            Нарікань по дз немає. Активний на заняттях. Так тримати.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-2xl mx-auto">
          <h2 className="font-bold text-xl mb-2">Викладач, Розробка вебсторінок мовою HTML та CSS (10.0.0)</h2>
          <p className="text-gray-600 text-sm mb-2">07.11.2023</p>
          <p className="text-gray-700">
            Учень здібний та розумний студент. Активний на заняттях. Матеріал засвоїв. 
            Нарікань по практичний та дз немає. Так тримати.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-2xl mx-auto">
          <h2 className="font-bold text-xl mb-2">Викладач, Програмування на C++ (10.0.0)</h2>
          <p className="text-gray-600 text-sm mb-2">07.11.2023</p>
          <p className="text-gray-700">
            Учень добросовісно відноситься до занять, демонструє високу мотивацію та зацікавленість у навчанні. 
            В ході виконання завдань проявляє творчість. Здатний швидко засвоювати нові матеріали та розв'язувати складні задачі. 
            Завжди присутній на заняттях та уважно слухає. Домашні завдання виконує вчасно.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReviewsPage;
