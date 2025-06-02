
import { Subtitle } from "../Titles/Subtitle/Subtitle";

// Helper to pad numbers with leading zeros
const pad = (num) => num.toString().padStart(2, "0");

export const DateTimeDisplay = ({ date, className = "" }) => {
  if (!date) return <span className={className}>—</span>;

  const d = new Date(date);
  if (isNaN(d.getTime())) return <span className={className}>Invalid date</span>;

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hour = pad(d.getHours());
  const minute = pad(d.getMinutes());

  return (
    <Subtitle>
      {day} / {month} / {year} — {hour}:{minute}
    </Subtitle>
  );
};

export default DateTimeDisplay;
