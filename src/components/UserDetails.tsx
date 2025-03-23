import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams, Link } from "react-router-dom";
import styles from "./UserDetails.module.css";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = parseInt(id || "0");

  const { users } = useSelector((state: RootState) => state.users);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return (
      <div className={styles.notFound}>
        <p>User not found</p>
        <Link to="/users" className={styles.backLink}>
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Details</h2>
      <div className={styles.card}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.info}>
          <span>Email:</span> {user.email}
        </p>
        <div className={styles.address}>
          <h4>Address:</h4>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Link to={`/edit-user/${user.id}`} className={styles.editButton}>
            Edit User
          </Link>
          <Link to="/users" className={styles.backButton}>
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
