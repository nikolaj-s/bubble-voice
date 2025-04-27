// components/Widgets/NoWidgetsPlaceholder/NoWidgetsPlaceholder.jsx
import React from "react";
import styles from "./NoWidgetsPlaceholder.module.css";
import { PlusCircle } from "lucide-react";
import TextButton from "../../ui/Buttons/TextButton/TextButton";

export const NoWidgetsPlaceholder = ({ user_can_edit_channels, action = () => {} }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.message}>No widgets have been added yet.</p>
        {user_can_edit_channels && (
          <TextButton title="Add Widget" action={action} icon={<PlusCircle color="var(--text-color)" />} />
        )}
      </div>
    </div>
  );
};
