'use client';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './signup.module.css';

export default function RegisterPage() {
  return (
    <Container fluid className={styles.registerPage}>
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={10} md={7} lg={6} xl={5}>
          <Card className={styles.registerCard}>
            <Card.Body className={styles.registerCardBody}>
              <h2 className={`${styles.registerTitle} text-center mb-4`}>
                Sign Up
              </h2>

              <Form>
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className={`${styles.btnRegister} w-100 mb-3`}
                >
                  Daftar
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
