import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addUser, updateUser, User } from '../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState,useAppDispatch } from '../redux/store';




const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const userId = parseInt(id || '0');
  
  const { users } = useSelector((state: RootState) => state.users);
  const userToEdit = users.find(user => user.id === userId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  });

  useEffect(() => {
    if (isEditing && userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        street: userToEdit.address.street,
        suite: userToEdit.address.suite,
        city: userToEdit.address.city,
        zipcode: userToEdit.address.zipcode,
      });
    }
  }, [isEditing, userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      id: isEditing ? userId : Date.now(), 
      name: formData.name,
      email: formData.email,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
      },
    };

    if (isEditing && userToEdit) {
      dispatch(updateUser({ ...userData, id: userId } as User));
    } else {
      dispatch(addUser(userData));
    }

    navigate('/users');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Suite</label>
              <input
                type="text"
                name="suite"
                value={formData.suite}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Update User' : 'Add User'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;