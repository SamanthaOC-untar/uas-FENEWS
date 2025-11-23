'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Nav, Form, InputGroup } from 'react-bootstrap';
import styles from '../app/styles/header.module.css';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

        {/* Search Box */}
        <Form onSubmit={handleSearch} className={styles.searchForm}>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <i className="bi bi-search"></i>
            </button>
          </InputGroup>
        </Form>

        {/* Nav kanan */}
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