import { useState, useEffect, useRef } from "react";
import styles from "./DatePicker.module.css";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const DatePicker = ({ onDateChange = () => {} }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const originalDate = new Date(date);

    const iso = originalDate.toISOString().replace('Z', '+00:00');

    onDateChange(iso);
    setIsOpen(false);
  };

  const clearDate = () => {
    setSelectedDate(null);
    onDateChange(null);
  };

  const changeMonth = (month) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
  };

  const changeYear = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  const generateCalendarDays = () => {
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    for (let i = 1; i <= endDate.getDate(); i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    return days;
  };

  return (
    <div className={styles.datePickerContainer} ref={datePickerRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.datePickerButton}>
        <Calendar size={20} /> {selectedDate ? selectedDate.toLocaleDateString() : "Select a Date"}
      </button>
      
      {isOpen && (
        <div className={styles.datePickerMenu}>
          <div className={styles.calendarHeader}>
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => changeMonth(parseInt(e.target.value))}
              className={styles.dropdown}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => changeYear(parseInt(e.target.value))}
              className={styles.dropdown}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={currentMonth.getFullYear() - i}>
                  {currentMonth.getFullYear() - i}
                </option>
              ))}
            </select>
            {selectedDate && (
                <button onClick={clearDate} className={styles.clearButton}>
                <X size={16} />
                </button>
            )}
          </div>
          <div className={styles.calendarGrid}>
            {generateCalendarDays().map((date, i) => (
              <button
                key={i}
                onClick={() => handleDateSelect(date)}
                className={`${styles.calendarDay} ${selectedDate && selectedDate.toDateString() === date.toDateString() ? styles.selected : ""}`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

