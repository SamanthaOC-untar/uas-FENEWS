'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Nav } from 'react-bootstrap';
import styles from '../app/styles/header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        {/* Brand kiri */}
        <Link
          href="/"
          className={styles.brand}
          aria-label="FE - NEWS Home"
        >
          <span className={styles.logo}>FE</span>
          <span className={styles.title}>FE - NEWS</span>
          <span className={styles.tagline}>Fast &amp; Accurate</span>
        </Link>

        {/* Nav kanan pakai react-bootstrap */}
        <Nav
          as="nav"
          aria-label="Main navigation"
          className={styles.nav}
        >
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/aboutus" className={styles.navLink}>
            About Us
          </Link>
          <Link href="/subscription" className={styles.navLink}>
            Subscription
          </Link>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
