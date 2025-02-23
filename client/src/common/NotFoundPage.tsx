import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 text-center overflow-hidden">
      <div className="max-md">
        <img src="images/astronaut.png" alt="Lost Astronaut" className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-[#86aac0] drop-shadow-[1px_1px_0px_black]">We can't find what you're looking for...</h1>
        <p className="text-gray-600 mb-10"> We couldn’t find what you searched for. Try searching again.</p>
        <Link to="/">
          <Button type="primary" className="bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white px-6 py-4 font-medium rounded-lg shadow-md text-base">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
