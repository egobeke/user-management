import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUsers } from '../redux/userSlice';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import styles from './UserList.module.css';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading users...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>User Management</h2>
        <Link to="/add-user" className={styles.addButton}>
          Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <p className={styles.noUsers}>No users found.</p>
      ) : (
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
