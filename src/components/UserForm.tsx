import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addUser, updateUser, User } from '../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import styles from './UserForm.module.css';

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
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEditing ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <h3 className={styles.subtitle}>Address</h3>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Suite</label>
            <input
              type="text"
              name="suite"
              value={formData.suite}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            {isEditing ? 'Update User' : 'Add User'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
