import { useState } from "react";

import styles from "./UserPermissionsEditor.module.css";

import BoolInput from "../../ui/Inputs/BoolInput/BoolInput";
import TextButton from "../../ui/Buttons/TextButton/TextButton";
import { useSearchParams } from "react-router-dom";
import Label from "../../ui/Titles/Label/Label";
import TextInput from "../../ui/Inputs/TextInput/TextInput";
import ErrorCard from "../../Error/ErrorCard/ErrorCard";
import { ApplyChangesPopup } from "../../ApplyChangesPopup/ApplyChangesPopup";

const UserPermissionsEditor = ({ permissions, onUpdate }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [updatedPermissions, setUpdatedPermissions] = useState(permissions);

  const [changesMade, setChangesMade] = useState(false);

  const handleToggle = (key) => {
    setUpdatedPermissions((prev) => {
      const newPermissions = { ...prev, [key]: !prev[key] };
      setChangesMade(true);
      return newPermissions;
    });
  };

  const updatePermissionGroupName = (value) => {

    setUpdatedPermissions((prev) => {
      const newPermissions = { ...prev, server_group_name: value };
      setChangesMade(true);
      return newPermissions;
    });

  }

  const handleApplyChanges = () => {

    if (updatedPermissions.server_group_name.trim().length < 3) return;

    onUpdate(updatedPermissions);

    setChangesMade(false);
  };

  const handleCancel = () => {
    setSearchParams({section: "permissions"});
  }

  if (!permissions) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editing Permission Group: {permissions.server_group_name}</h2>
      <Label label="Edit Name:" />
      <TextInput 
      onChange={updatePermissionGroupName}
      value={updatedPermissions.server_group_name} 
      error={updatedPermissions.server_group_name.trim().length < 3 ? 'Invalid Name' : false} />
      <div className={styles.permissionsList}>
        {permissions.admin ? 
        null
        :
        Object.keys(permissions).sort().map((key) =>
          key.includes("user") ? (
              <BoolInput 
              key={key}
              value={updatedPermissions[key]}
              onChange={() => {handleToggle(key)}}
              name={key.replace(/_/g, " ").replace("user can", "User Can")}
              />
             
          ) : null
        )}
      </div>
      <ApplyChangesPopup disabled={!changesMade} onApply={handleApplyChanges} onClearChanges={handleCancel} />
    </div>
  );
};

export default UserPermissionsEditor;
