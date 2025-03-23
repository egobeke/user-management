import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams, Link } from 'react-router-dom';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || '0');
  
  const { users } = useSelector((state: RootState) => state.users);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>User not found</p>
        <Link to="/users" className="text-blue-500 hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
        <p className="mb-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <div className="mb-4">
          <h4 className="font-medium">Address:</h4>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <Link
            to={`/edit-user/${user.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit User
          </Link>
          <Link
            to="/users"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;