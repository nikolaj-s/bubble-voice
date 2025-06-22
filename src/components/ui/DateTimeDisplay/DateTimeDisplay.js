


import styles from './DateTimeDisplay.module.css'

// Helper to pad numbers with leading zeros
const pad = (num) => num.toString().padStart(2, "0");

export const DateTimeDisplay = ({ date, className = "" }) => {
  if (!date) return null;

  const d = new Date(date);
  if (isNaN(d.getTime())) return <span className={className}>Invalid date</span>;

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hour = pad(d.getHours());
  const minute = pad(d.getMinutes());

  return (
    <p className={styles.time}>
      - {day}-{month}-{year}  {hour}:{minute}
    </p>
  );
};

export default DateTimeDisplay;
