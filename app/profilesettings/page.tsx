'use client';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import styles from './profilesettings.module.css';
import Link from 'next/link';

export default function ProfileSettingPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // sementara hanya prevent reload, belum ada backend
  };

  return (
    <Container fluid className={styles.settingsPage}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} lg={8}>
          <Card className={styles.settingsCard}>
            <Card.Body className={styles.cardBody}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.title}>Profile Settings</h1>
                  <p className={styles.subtitle}>
                    Atur informasi profil untuk FE-NEWS.
                  </p>
                </div>
              </div>

              <Form onSubmit={handleSubmit} className={styles.form}>
                {/* Baris 1: Nama lengkap + Username */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="fullName">
                      <Form.Label className={styles.formLabel}>
                        Nama Lengkap
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        className={styles.formControl}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="username">
                      <Form.Label className={styles.formLabel}>
                        Username
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="@username"
                        className={styles.formControl}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Baris 2: Status + Email */}
                <Row className="g-3 mb-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="status">
                      <Form.Label className={styles.formLabel}>
                        Status
                      </Form.Label>
                      <Form.Select
                        className={styles.formControl}
                        defaultValue="pembaca"
                      >
                        <option value="pembaca">Pembaca FE-News</option>
                        <option value="peminat">Peminat FE-News</option>
                        <option value="pecinta">Pecinta FE-News</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className={styles.formLabel}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="nama@contoh.com"
                        className={styles.formControl}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Baris 3: Minat */}
                <Row className="mb-4">
                  <Col>
                    <Form.Group controlId="interests">
                      <Form.Label className={styles.formLabel}>
                        Minat
                      </Form.Label>
                      <div className={styles.interestsGroup}>
                        {['Teknologi', 'Ekonomi', 'Olahraga', 'Politik', 'Lainnya'].map(
                          (label, idx) => (
                            <label
                              key={label}
                              className={styles.interestChip}
                            >
                              <input
                                type="checkbox"
                                className={styles.interestInput}
                                name="interests"
                                value={label.toLowerCase()}
                                defaultChecked={idx < 2} // contoh saja
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Tombol aksi */}
                <Row className={styles.actionsRow}>
                  <Col>
                    <div className={styles.actionsRowButtons}>
                    <Link href="/profile">
                      <Button 
                        type="button"
                        className={styles.secondaryButton}
                      >
                        Cancel
                      </Button>
                    </Link>
                      <Button
                        type="submit"
                        className={styles.primaryButton}
                      >
                        Save changes
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
