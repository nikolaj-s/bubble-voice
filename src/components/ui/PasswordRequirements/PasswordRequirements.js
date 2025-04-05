
import Label from "../Titles/Label/Label";
import styles from "./PasswordRequirements.module.css";

const PasswordRequirements = ({ password }) => {
  const requirements = [
    { label: "At least 10 characters", test: (pw) => pw.length >= 10 },
    { label: "At least 1 number", test: (pw) => /\d/.test(pw) },
    { label: "At least 1 special character", test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
    { label: "At least 1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "At least 1 lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  ];

  return (
    <div className={styles.requirementsContainer}>
    <Label label="Password Must Contain:" />
      <ul>
        {requirements.map(({ label, test }, index) => (
          <li key={index} className={test(password) ? styles.valid : styles.invalid}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
