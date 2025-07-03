import React from 'react';
import styles from './style.module.scss';

const ContactUs = () => {
  return (
    <div className={styles.contactUsWrapper}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <span className={styles.logoIcon}>🏫</span>
          <span className={styles.logoText}>Student Registration Portal</span>
        </div>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.registrationGrid}>
          <div className={`${styles.registrationCard} ${styles.newAdmission}`}>
            <div className={styles.cardIcon}>📄</div>
            <h2 className={styles.cardTitle}>New Admission</h2>
            <p className={styles.cardSubtitle}>First-time registration for new students</p>
            <p className={styles.cardDescription}>For first-time applicants and new students</p>
            <a href="https://forms.gle/iSTzBBH3SNWvuJa1A" target="_blank" rel="noopener noreferrer">
              <button className={styles.cardButton}>Start New Admission</button>
            </a>
          </div>
          <div className={`${styles.registrationCard} ${styles.feedback}`}>
            <div className={styles.cardIcon}>🔍</div>
            <h2 className={styles.cardTitle}>Feedback and Query</h2>
            <p className={styles.cardSubtitle}>Check your application status</p>
            <p className={styles.cardDescription}>Track your application progress</p>
            <a href="https://forms.gle/QEfcQugP2he6SGLH8" target="_blank" rel="noopener noreferrer">
              <button className={styles.cardButton}>Enquire</button>
            </a>
          </div>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Important Notice</h3>
            <ul className={styles.infoList}>
              <li>All documents must be in PDF format</li>
              <li>Application deadline: March 31, 2024</li>
              <li>Interview dates will be announced soon</li>
            </ul>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Required Documents</h3>
            <ul className={styles.infoList}>
              <li>Valid ID proof</li>
              <li>Academic transcripts</li>
              <li>Passport size photographs</li>
            </ul>
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.infoTitle}>Contact Support</h3>
            <ul className={styles.infoList}>
              <li>Email: support@institution.edu</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri, 9AM-5PM</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs; 