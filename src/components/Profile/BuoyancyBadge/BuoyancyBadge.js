import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Waves, ArrowUpRight } from "lucide-react";
import styles from "./BuoyancyBadge.module.css";

const formatNumber = (n = 0) => {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}K`;
  return `${num}`;
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const getLevel = (total = 0) => {
  // gentle curve; tweak as you like
  const lvl = Math.floor(Math.sqrt(Math.max(0, total) / 25)) + 1;
  return clamp(lvl, 1, 99);
};

const getStageLabel = (lvl) => {
  if (lvl <= 20) return "Drifting";
  if (lvl <= 100) return "Floating";
  if (lvl <= 500) return "Rising";
  if (lvl <= 5000) return "Soaring";
  return "Skybound";
};

export default function BuoyancyBadge({
  total = 0,
  showLabel = true,
  compact = false,
  onClick,
  className = "",
}) {
  const level = useMemo(() => getLevel(total), [total]);
  const stage = useMemo(() => getStageLabel(level), [level]);

  const progress = useMemo(() => {
    const lvl = level;
    const start = (lvl - 1) * (lvl - 1) * 25;
    const end = lvl * lvl * 25;
    const pct = ((total - start) / Math.max(1, (end - start))) * 100;
    return clamp(pct, 0, 100);
  }, [total, level]);

  return (
    <div
      type="button"
      className={`${styles.badge} ${compact ? styles.compact : ""} ${className}`}
     title={`Buoyancy: ${total} • Level ${level} (${stage})`}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Waves size={16} className={styles.icon} />
        <span className={styles.bubble} />
        <span className={styles.bubble2} />
      </span>

      <span className={styles.main}>
        {showLabel && !compact && (
          <span className={styles.label}>Buoyancy</span>
        )}

        <span className={styles.row}>
          <span className={styles.value}>{formatNumber(total)}</span>
          <span className={styles.level}>Lv {level}</span>
        </span>

        {!compact && (
          <span className={styles.subRow}>
            <span className={styles.stage}>{stage}</span>
            <span className={styles.progressWrap} aria-hidden="true">
              <span className={styles.progressBar} style={{ width: `${progress}%` }} />
            </span>
          </span>
        )}
      </span>

      {onClick && (
        <span className={styles.action} aria-hidden="true">
          <ArrowUpRight size={14} />
        </span>
      )}
    </div>
  );
}

BuoyancyBadge.propTypes = {
  total: PropTypes.number,
  showLabel: PropTypes.bool,
  compact: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
