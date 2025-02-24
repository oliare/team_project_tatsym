import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileProps} from "../interfaces/interfaces.tsx";


const UserProfile: React.FC<UserProfileProps> = ({
  name,
  surname,
  phone,
  email,
  avatarUrl,
}) => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Profile saved successfully");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Персональні дані</h2>
      <div className="relative">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
        <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md ">
          📷
        </button>
      </div>
      <div className="w-full max-w-2xl mt-6 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3">Персональна інформація</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border rounded-md p-2 w-full disabled"
            type="text"
            value={name}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full disabled"
            type="text"
            value={surname}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full disabled"
            type="text"
            value={phone}
            disabled
          />
          <input
            className="border rounded-md p-2 w-full disabled"
            type="email"
            value={email}
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
