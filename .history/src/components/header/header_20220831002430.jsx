import React from 'react';
import { memo } from 'react';
import styles from './header.module.css';
const Header = memo(({ user, onLogout }) => {
  console.log('header');
  return (
    <header className={styles.headers}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.logo__title}>Aloneat</h2>
        </div>
        {user && (
          <nav className={styles.right}>
            <button onClick={onLogout}>로그아웃</button>
          </nav>
        )}
      </div>
    </header>
  );
});

export default Header;
