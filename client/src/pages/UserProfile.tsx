import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUserDto } from "../interfaces/users/user";
import { getUser } from "../api/users/userProfileApi"; 
import avatar from "../../public/images/avatar.jpg"


const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserDto | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  
  

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Profile saved successfully");
    navigate("/");
  };

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Персональні дані</h2>
      <div className="relative">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
        <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md">
          📷
        </button>
      </div>
      <div className="w-full max-w-2xl mt-6 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">Персональна інформація</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border rounded-md p-2 w-full"
            type="text"
            value={user.firstName}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full"
            type="text"
            value={user.lastName}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full"
            type="email"
            value={user.email}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full"
            type="text"
            value={new Date(user.dateOfBirth).toLocaleDateString()}
            disabled
          />
        </div>
      </div>
      <div className="w-full max-w-2xl mt-6 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">Зміна пароля</h3>
        <input
          className="border rounded-md p-2 w-full mb-3"
          type="password"
          placeholder="Старий пароль"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="border rounded-md p-2 w-full mb-3"
          type="password"
          placeholder="Новий пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="border rounded-md p-2 w-full mb-3"
          type="password"
          placeholder="Підтвердження пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-custom-blue transition"
        onClick={handleSave}
      >
        Зберегти
      </button>
    </div>
  );
};

export default UserProfile;
