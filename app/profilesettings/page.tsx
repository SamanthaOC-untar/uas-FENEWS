'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './profilesettings.module.css';

type UserStatus = 'PEMBACA_FE_NEWS' | 'PEMINAT_FE_NEWS' | 'PECINTA_FE_NEWS';

type UserProfile = {
  id: number;
  fullName: string;
  username: string | null;
  email: string;
  status: UserStatus;
  interests: string | null;
};

const INTEREST_OPTIONS = [
  { label: 'Teknologi', value: 'teknologi' },
  { label: 'Ekonomi', value: 'ekonomi' },
  { label: 'Olahraga', value: 'olahraga' },
  { label: 'Politik', value: 'politik' },
  { label: 'Lainnya', value: 'lainnya' },
];

export default function ProfileSettingPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<UserStatus>('PEMBACA_FE_NEWS');
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load data profil awal
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
            return;
          }
          setErrorMsg(data.message || 'Gagal memuat data profil.');
        } else {
          const user: UserProfile = data.user;
          setFullName(user.fullName || '');
          setUsername(user.username || '');
          setEmail(user.email || '');
          setStatus(user.status || 'PEMBACA_FE_NEWS');

          // parse interests "teknologi,ekonomi" -> ['teknologi','ekonomi']
          if (user.interests) {
            const arr = user.interests
              .split(',')
              .map((i) => i.trim())
              .filter(Boolean);
            setSelectedInterests(arr);
          } else {
            setSelectedInterests([]);
          }
        }
      } catch (err) {
        setErrorMsg('Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const interestsString =
        selectedInterests.length > 0 ? selectedInterests.join(',') : '';

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName,
          username,
          email,
          status,          // enum langsung
          interests: interestsString,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Gagal menyimpan perubahan.');
      } else {
        setSuccessMsg('Perubahan profil berhasil disimpan.');
        // opsional: kembali ke /profile setelah beberapa detik
        // setTimeout(() => router.push('/profile'), 1200);
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
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
                </div>
              </div>

              {loading && (
                <p className={styles.loadingText}>Memuat data profil...</p>
              )}
              {errorMsg && !loading && (
                <div className="alert alert-danger py-2 mb-3">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="alert alert-success py-2 mb-3">
                  {successMsg}
                </div>
              )}

              {!loading && (
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
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                          value={status}
                          onChange={(e) =>
                            setStatus(e.target.value as UserStatus)
                          }
                        >
                          <option value="PEMBACA_FE_NEWS">
                            Pembaca FE-News
                          </option>
                          <option value="PEMINAT_FE_NEWS">
                            Peminat FE-News
                          </option>
                          <option value="PECINTA_FE_NEWS">
                            Pecinta FE-News
                          </option>
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
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
                          {INTEREST_OPTIONS.map(({ label, value }) => (
                            <label
                              key={value}
                              className={styles.interestChip}
                            >
                              <input
                                type="checkbox"
                                className={styles.interestInput}
                                name="interests"
                                value={value}
                                checked={selectedInterests.includes(value)}
                                onChange={() => toggleInterest(value)}
                              />
                              <span>{label}</span>
                            </label>
                          ))}
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
                            Kembali
                          </Button>
                        </Link>
                        <Button
                          type="submit"
                          className={styles.primaryButton}
                          disabled={saving}
                        >
                          {saving ? 'Menyimpan...' : 'Save changes'}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
