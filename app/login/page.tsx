'use client';

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <Container
      fluid
      className={styles.loginPage}
    >
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card className={styles.loginCard}>
            <Card.Body className={styles.loginCardBody}>
              <h2 className={`${styles.loginTitle} text-center mb-4`}>Login</h2>

              <Form>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className={styles.loginLabel}>Email</Form.Label>
                  <Form.Control
                    className={styles.loginControl}
                    type="email"
                    placeholder="Masukkan email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="loginPassword">
                  <Form.Label className={styles.loginLabel}>Kata Sandi</Form.Label>
                  <Form.Control
                    className={styles.loginControl}
                    type="password"
                    placeholder="Masukkan kata sandi"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className={`${styles.btnLogin} w-100 mb-3`}
                >
                  Masuk
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
