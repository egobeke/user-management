import React from 'react';
import { User, deleteUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  const handleViewDetails = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500">
        {user.address.street}, {user.address.city}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;