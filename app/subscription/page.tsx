'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import styles from './subscription.module.css';

interface Subscription {
  id: number;
  plan: 'MONTHLY' | 'YEARLY';
  priceInRupiah: number;
  status: string;
  startDate: string;
  endDate: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Kartu Kredit',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
  },
  {
    id: 'bank_transfer',
    name: 'Transfer Bank',
    icon: '🏦',
    description: 'Transfer langsung ke rekening bank kami',
  },
  {
    id: 'e_wallet',
    name: 'E-Wallet',
    icon: '📱',
    description: 'GCash, OVO, Dana, LinkAja',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🌐',
    description: 'Pembayaran internasional yang aman',
  },
];

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function SubscriptionPage() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'MONTHLY' | 'YEARLY' | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(data);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan: 'MONTHLY' | 'YEARLY') => {
    setSelectedPlan(plan);
    setSelectedPayment(null);
    setShowPaymentModal(true);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !selectedPayment) {
      setMessage('Silakan pilih metode pembayaran');
      setMessageType('error');
      return;
    }

    setSubscribing(true);
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          plan: selectedPlan,
          paymentMethod: selectedPayment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(data);
        setMessage(`Berhasil berlangganan paket ${selectedPlan === 'MONTHLY' ? 'Bulanan' : 'Tahunan'} dengan ${getPaymentMethodName(selectedPayment)}!`);
        setMessageType('success');
        setShowPaymentModal(false);
        setSelectedPlan(null);
        setSelectedPayment(null);
      } else {
        const error = await response.json();
        setMessage(error.error || 'Gagal berlangganan');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setMessage('Terjadi kesalahan');
      setMessageType('error');
    } finally {
      setSubscribing(false);
    }
  };

  const getPaymentMethodName = (id: string) => {
    return paymentMethods.find((m) => m.id === id)?.name || id;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <Container className={`py-5 ${styles.subscriptionContainer}`}>
      <Row className="mb-5">
        <Col lg={12}>
          <h1 className={styles.title}>Paket Berlangganan FE News</h1>
          <p className={styles.subtitle}>
            Nikmati akses penuh ke semua konten premium kami
          </p>
        </Col>
      </Row>

      {message && (
        <Row className="mb-4">
          <Col lg={12}>
            <Alert variant={messageType === 'success' ? 'success' : 'danger'} dismissible>
              {message}
            </Alert>
          </Col>
        </Row>
      )}

      {currentSubscription && (
        <Row className="mb-5">
          <Col lg={12}>
            <Alert variant="info">
              <strong>Status Langganan Aktif</strong>
              <br />
              Paket: <strong>{currentSubscription.plan === 'MONTHLY' ? 'Bulanan' : 'Tahunan'}</strong>
              <br />
              Harga: <strong>{formatRupiah(currentSubscription.priceInRupiah)}</strong>
              <br />
              Berlaku hingga: <strong>{new Date(currentSubscription.endDate).toLocaleDateString('id-ID')}</strong>
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        {/* Monthly Plan */}
        <Col lg={6} className="mb-4">
          <Card className={`${styles.card} ${styles.monthlyCard}`}>
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.planTitle}>Paket Bulanan</Card.Title>
              <p className={styles.description}>Akses penuh selama 1 bulan</p>
              
              <div className={styles.priceContainer}>
                <span className={styles.price}>{formatRupiah(49000)}</span>
                <span className={styles.period}>/bulan</span>
              </div>

              <ul className={styles.features}>
                <li>✓ Akses semua artikel premium</li>
                <li>✓ Notifikasi berita terbaru</li>
                <li>✓ Fitur download artikel</li>
                <li>✓ Akses kategori eksklusif</li>
              </ul>

              <Button
                variant="primary"
                size="lg"
                className={styles.subscribeBtn}
                onClick={() => handleSelectPlan('MONTHLY')}
                disabled={subscribing || (currentSubscription?.plan === 'MONTHLY')}
              >
                {subscribing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : currentSubscription?.plan === 'MONTHLY' ? (
                  'Paket Aktif'
                ) : (
                  'Pilih Paket Ini'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Yearly Plan */}
        <Col lg={6} className="mb-4">
          <Card className={`${styles.card} ${styles.yearlyCard}`}>
            <div className={styles.badge}>HEMAT 17%</div>
            <Card.Body className={styles.cardBody}>
              <Card.Title className={styles.planTitle}>Paket Tahunan</Card.Title>
              <p className={styles.description}>Akses penuh selama 1 tahun</p>
              
              <div className={styles.priceContainer}>
                <span className={styles.price}>{formatRupiah(490000)}</span>
                <span className={styles.period}>/tahun</span>
              </div>

              <ul className={styles.features}>
                <li>✓ Akses semua artikel premium</li>
                <li>✓ Notifikasi berita terbaru</li>
                <li>✓ Fitur download artikel</li>
                <li>✓ Akses kategori eksklusif</li>
                <li>✓ Hemat hingga Rp 98.000 per tahun</li>
              </ul>

              <Button
                variant="success"
                size="lg"
                className={styles.subscribeBtn}
                onClick={() => handleSelectPlan('YEARLY')}
                disabled={subscribing || (currentSubscription?.plan === 'YEARLY')}
              >
                {subscribing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : currentSubscription?.plan === 'YEARLY' ? (
                  'Paket Aktif'
                ) : (
                  'Pilih Paket Ini'
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Comparison Section */}
      <Row className="mt-5">
        <Col lg={12}>
          <Card className={styles.comparisonCard}>
            <Card.Body>
              <h3 className={styles.comparisonTitle}>Perbandingan Paket</h3>
              <div className={styles.comparisonTable}>
                <div className={styles.tableRow}>
                  <div className={styles.feature}>Akses Artikel Premium</div>
                  <div className={styles.checkmark}>✓</div>
                  <div className={styles.checkmark}>✓</div>
                </div>
                <div className={styles.tableRow}>
                  <div className={styles.feature}>Notifikasi Berita</div>
                  <div className={styles.checkmark}>✓</div>
                  <div className={styles.checkmark}>✓</div>
                </div>
                <div className={styles.tableRow}>
                  <div className={styles.feature}>Download Artikel</div>
                  <div className={styles.checkmark}>✓</div>
                  <div className={styles.checkmark}>✓</div>
                </div>
                <div className={styles.tableRow}>
                  <div className={styles.feature}>Kategori Eksklusif</div>
                  <div className={styles.checkmark}>✓</div>
                  <div className={styles.checkmark}>✓</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    {/* Payment Method Modal */}
    <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Pilih Metode Pembayaran</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.planSummary}>
          <h5>Ringkasan Paket</h5>
          <p>
            <strong>Paket:</strong> {selectedPlan === 'MONTHLY' ? 'Bulanan' : 'Tahunan'}
            <br />
            <strong>Harga:</strong> {formatRupiah(selectedPlan === 'MONTHLY' ? 49000 : 490000)}
          </p>
        </div>

        <h6 className={styles.paymentMethodsTitle}>Pilih Metode Pembayaran</h6>
        <div className={styles.paymentMethodsGrid}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`${styles.paymentMethod} ${selectedPayment === method.id ? styles.selected : ''}`}
              onClick={() => setSelectedPayment(method.id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.paymentIcon}>{method.icon}</div>
              <div className={styles.paymentInfo}>
                <strong>{method.name}</strong>
                <small>{method.description}</small>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button
          variant="secondary"
          onClick={() => setShowPaymentModal(false)}
          disabled={subscribing}
        >
          Batal
        </Button>
        <Button
          variant="primary"
          onClick={handleSubscribe}
          disabled={subscribing || !selectedPayment}
        >
          {subscribing ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Processing...
            </>
          ) : (
            'Lanjutkan Pembayaran'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
