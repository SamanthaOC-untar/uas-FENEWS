'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './signup.module.css';

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          password,
          passwordConfirm,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Registrasi gagal.');
      } else {
        // kalau sukses, arahkan ke halaman login
        router.push('/login');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className={styles.registerPage}>
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={10} md={7} lg={6} xl={5}>
          <Card className={styles.registerCard}>
            <Card.Body className={styles.registerCardBody}>
              <h2 className={`${styles.registerTitle} text-center mb-4`}>
                Sign Up
              </h2>

              {errorMsg && (
                <div className="alert alert-danger py-2 mb-3">{errorMsg}</div>
              )}

              <Form onSubmit={handleSubmit}>
                {/* BARIS 1: Nama & Telepon (2 kolom) */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="registerFullName">
                      <Form.Label className={styles.registerLabel}>
                        Nama Lengkap
                      </Form.Label>
                      <Form.Control
                        className={styles.registerControl}
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registerPhone">
                      <Form.Label className={styles.registerLabel}>
                        Nomor Telepon
                      </Form.Label>
                      <Form.Control
                        className={styles.registerControl}
                        type="tel"
                        placeholder="Masukkan nomor telepon"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* BARIS 2: Email (full width) */}
                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label className={styles.registerLabel}>Email</Form.Label>
                  <Form.Control
                    className={styles.registerControl}
                    type="email"
                    placeholder="Masukkan email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                {/* BARIS 3: Password & Konfirmasi (2 kolom) */}
                <Row className="g-3 mb-4">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="registerPassword">
                      <Form.Label className={styles.registerLabel}>
                        Kata Sandi
                      </Form.Label>
                      <Form.Control
                        className={styles.registerControl}
                        type="password"
                        placeholder="Masukkan kata sandi"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registerPasswordConfirm">
                      <Form.Label className={styles.registerLabel}>
                        Konfirmasi Kata Sandi
                      </Form.Label>
                      <Form.Control
                        className={styles.registerControl}
                        type="password"
                        placeholder="Konfirmasi kata sandi"
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className={`${styles.btnRegister} w-100 mb-3`}
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Daftar'}
                </Button>

                <div className="text-center small mb-2">
                  Sudah punya akun?{' '}
                  <a href="/login" className={styles.linkLogin}>
                    Login
                  </a>
                </div>

                <div className="text-center small">
                  <a href="/" className={styles.linkBackHome}>
                    Back to Home
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