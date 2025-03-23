import React from "react";
import { User, deleteUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import styles from "./UserCard.module.css";

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
    <div className={styles.card}>
      <h3 className={styles.name}>{user.name}</h3>
      <p className={styles.email}>{user.email}</p>
      <p className={styles.address}>
        {user.address.street}, {user.address.city}
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.viewButton} onClick={handleViewDetails}>
          View Details
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
