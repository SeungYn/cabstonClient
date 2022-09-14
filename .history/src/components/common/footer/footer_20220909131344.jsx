import React, { memo } from 'react';
import styles from './footer.module.css';
import { BiHomeAlt } from 'react-icons/bi';
import { BsList, BsPerson } from 'react-icons/bs';
import { GrContactInfo, GrGroup } from 'react-icons/gr';
import { RiGroupLine } from 'react-icons/ri';
import { IoChatbubbleOutline } from 'react-icons/io5';

import { Link, NavLink } from 'react-router-dom';
const FONTSIZE = '1.4rem';
const Footer = memo((props) => (
  <footer>
    <nav className={styles.nav}>
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive ? styles.actived : styles.unActived
        }
      >
        <div className={styles.navItem}>
          <BiHomeAlt fontSize={FONTSIZE} />
          <span className={styles.navItem__text}>홈</span>
        </div>
      </NavLink>
      <NavLink
        to='/trade'
        className={({ isActive }) =>
          isActive ? styles.actived : styles.unActived
        }
      >
        <div className={styles.navItem}>
          <BsList fontSize={FONTSIZE} />
          <span className={styles.navItem__text}>장터</span>
        </div>
      </NavLink>
      <NavLink
        to='/myParty'
        className={({ isActive }) =>
          isActive ? styles.actived : styles.unActived
        }
      >
        <div className={styles.navItem}>
          <RiGroupLine fontSize={FONTSIZE} />
          <span className={styles.navItem__text}>내파티</span>
        </div>
      </NavLink>
      <NavLink
        to='/3'
        className={({ isActive }) =>
          isActive ? styles.actived : styles.unActived
        }
      >
        <div className={styles.navItem}>
          <IoChatbubbleOutline fontSize={FONTSIZE} />
          <span className={styles.navItem__text}>채팅</span>
        </div>
      </NavLink>
      <NavLink
        to='/4'
        className={({ isActive }) =>
          isActive ? styles.actived : styles.unActived
        }
      >
        <div className={styles.navItem}>
          <BsPerson fontSize={FONTSIZE} />
          <span className={styles.navItem__text}>내 정보</span>
        </div>
      </NavLink>
    </nav>
  </footer>
));

export default Footer;
