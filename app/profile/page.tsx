'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './profile.module.css';

export default function ProfilePage() {
  return (
    <Container fluid className={styles.profilePage}>
      <Row className="justify-content-center w-100">
        <Col xs={12} md={10} lg={9}>
          <Card className={styles.profileCard}>
            {/* Cover + avatar */}
            <div className={styles.cover}>
              <div className={styles.avatar}>
                <span className={styles.avatarIcon}>👤</span>
              </div>
            </div>

            <Card.Body className={styles.cardBody}>
              {/* Identity bar */}
              <Row className={styles.identityRow}>
                <Col xs={12} md={6}>
                  <div className={styles.nameBlock}>
                    <h1 className={styles.fullName}>Venus Mars</h1>
                    <p className={styles.username}>@venusmars</p>
                  </div>
                </Col>
                <Col xs={12} md={6} className={styles.roleCol}>
                  <p className={styles.role}>Pembaca FE-NEWS</p>
                </Col>
              </Row>

              {/* Detail singkat */}
              <Row className={styles.detailsRow}>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>
                      venus.mars@femail.com
                    </span>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Minat</span>
                    <span className={styles.detailValue}>
                      Teknologi • Ekonomi
                    </span>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Bergabung</span>
                    <span className={styles.detailValue}>Jan 2025</span>
                  </div>
                </Col>
              </Row>

              {/* Tombol Settings + Subscription di kanan bawah */}
              <Row className={styles.actionsRow}>
                <Col>
                  <div className={styles.actionsRowButtons}>
                    <Link href="/subscription">
                      <Button className={styles.subscriptionButton}>
                        Subscription
                      </Button>
                    </Link>
                    <Link href="/profilesettings">
                      <Button className={styles.settingsButton}>
                        Settings
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
