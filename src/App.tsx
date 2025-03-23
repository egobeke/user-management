import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <div className={styles.navContainer}>
            <h1 className={styles.title}>User Management System</h1>
            <nav className={styles.navbar}>
              <Link to="/users" className={styles.navLink}>User List</Link>
              <Link to="/add-user" className={styles.navLink}>Add User</Link>
            </nav>
          </div>
        </header>
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;