'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Container, Nav, Form, InputGroup, Dropdown } from 'react-bootstrap';
import styles from '../app/styles/header.module.css';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 👈 pantau perubahan route

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Cek status login dari backend (JWT via /api/profile)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [pathname]); // 👈 setiap path berubah, cek lagi

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // abaikan error network kecil
    } finally {
      setIsLoggedIn(false);
      router.push('/login');
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

          {/* Icon Profile + Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              id="profile-dropdown"
              variant="link"
              className={styles.navLink}
            >
              <i className="bi bi-person-circle"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="dropdown-item">
                    Login
                  </Link>
                  <Link href="/signup" className="dropdown-item">
                    Sign Up
                  </Link>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
