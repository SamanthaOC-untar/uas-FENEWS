'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // supaya cookie JWT ikut
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // pesan dari backend (termasuk "Email belum terdaftar...")
        setErrorMsg(data.message || 'Login gagal.');
      } else {
        router.push('/profile');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className={styles.loginPage}>
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card className={styles.loginCard}>
            <Card.Body className={styles.loginCardBody}>
              <h2 className={`${styles.loginTitle} text-center mb-4`}>Login</h2>

              {errorMsg && (
                <div className="alert alert-danger py-2 mb-3">
                  {errorMsg}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className={styles.loginLabel}>Email</Form.Label>
                  <Form.Control
                    className={styles.loginControl}
                    type="email"
                    placeholder="Masukkan email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label className={styles.loginLabel}>
                    Kata Sandi
                  </Form.Label>
                  <Form.Control
                    className={styles.loginControl}
                    type="password"
                    placeholder="Masukkan kata sandi"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className={`${styles.btnLogin} w-100 mb-3`}
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </Button>

                <div className="text-center small">
                  Belum punya akun?{' '}
                  <a href="/signup" className={styles.linkSignup}>
                    Sign Up
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
