import React from "react";
import styles from "../app/styles/header.module.css";



export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand} aria-label="Minmin Jaya Bakery Home">
          <span className={styles.logo}>FE</span>
          <span className={styles.title}>FE - NEWS</span>
          <span className={styles.tagline}> Fast &amp; Accurate </span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
         <a href="/">Home</a>
                <a href="/aboutus.html">About Us</a>
                <a href="/subscription.html">Subscription</a>
                <a href="/profile.html">Profile</a>
                <a href="/login.html">Login</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
