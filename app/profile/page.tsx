'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './profile.module.css';

type UserStatus = 'PEMBACA_FE_NEWS' | 'PEMINAT_FE_NEWS' | 'PECINTA_FE_NEWS';

type UserProfile = {
  id: number;
  fullName: string;
  username: string | null;
  email: string;
  status: UserStatus;
  interests: string | null;
  createdAt: string; // dari API jadi string
};

function formatStatus(status?: UserStatus) {
  switch (status) {
    case 'PEMBACA_FE_NEWS':
      return 'Pembaca FE-NEWS';
    case 'PEMINAT_FE_NEWS':
      return 'Peminat FE-NEWS';
    case 'PECINTA_FE_NEWS':
      return 'Pecinta FE-NEWS';
    case 'PECINTA_FE_NEWS':
      return 'Pecinta FE-NEWS';
    default:
      return 'Pembaca FE-NEWS';
  }
}

function formatInterests(interests?: string | null) {
  if (!interests) return '-';
  return interests
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean)
    .join(' • ');
}

function formatJoined(createdAt?: string) {
  if (!createdAt) return '-';
  const d = new Date(createdAt);
  return d.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include', // penting supaya cookie JWT ikut
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            // belum login
            router.push('/login');
            return;
          }
          setErrorMsg(data.message || 'Gagal memuat profil.');
        } else {
          setUser(data.user);
        }
      } catch (err) {
        setErrorMsg('Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const displayName = user?.fullName || 'User';
  const displayUsername =
    user?.username ?? (user?.email ? user.email.split('@')[0] : 'user');

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
              {loading && (
                <p className={styles.loadingText}>Memuat profil...</p>
              )}
              {errorMsg && !loading && (
                <p className={styles.errorText}>{errorMsg}</p>
              )}

              {/* Identity bar */}
              <Row className={styles.identityRow}>
                <Col xs={12} md={6}>
                  <div className={styles.nameBlock}>
                    <h1 className={styles.fullName}>{displayName}</h1>
                    <p className={styles.username}>@{displayUsername}</p>
                  </div>
                </Col>
                <Col xs={12} md={6} className={styles.roleCol}>
                  <p className={styles.role}>{formatStatus(user?.status)}</p>
                </Col>
              </Row>

              {/* Detail singkat */}
              <Row className={styles.detailsRow}>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <span className={styles.detailValue}>
                      {user?.email ?? '-'}
                    </span>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Minat</span>
                    <span className={styles.detailValue}>
                      {formatInterests(user?.interests)}
                    </span>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Bergabung</span>
                    <span className={styles.detailValue}>
                      {formatJoined(user?.createdAt)}
                    </span>
                  </div>
                </Col>
              </Row>

              {/* Tombol Settings + Subscription */}
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
