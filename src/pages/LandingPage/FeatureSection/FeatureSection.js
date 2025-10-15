import React from 'react';
import { Users, Gamepad2, Compass } from 'lucide-react';
import styles from './FeatureSection.module.css';

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.featuresGrid}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}><Users size={28} /></div>
        <h3>Create micro communities</h3>
        <p className={styles.cardText}>
          Spin up focused groups with custom access — perfect for friends, study groups, or game teams.
        </p>
        <ul className={styles.bulletList}>
          <li>Small groups, high engagement</li>
          <li>Persistent rooms & pinned topics</li>
          <li>Role-based access control</li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper}><Gamepad2 size={28} /></div>
        <h3>Game, chat, and discuss</h3>
        <p className={styles.cardText}>
          Seamlessly switch between voice, video, and text while you play or hang out.
        </p>
        <ul className={styles.bulletList}>
          <li>Low-latency voice rooms</li>
          <li>Synchronized media playback</li>
          <li>Threaded discussions and reactions</li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper}><Compass size={28} /></div>
        <h3>Discover something new</h3>
        <p className={styles.cardText}>
          Explore curated communities and meet people around shared interests.
        </p>
        <ul className={styles.bulletList}>
          <li>Topic-based discovery</li>
          <li>Local recommendations</li>
          <li>Community events & schedules</li>
        </ul>
      </div>
    </section>
  );
}
