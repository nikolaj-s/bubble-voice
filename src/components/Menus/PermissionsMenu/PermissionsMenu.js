import React, { useState } from "react";
import styles from "./PermissionsMenu.module.css";
import Label from "../../Titles/Label/Label";
import BoolInput from "../../Inputs/BoolInput/BoolInput";

const PermissionsMenu = ({ permissions, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedPermissions, setUpdatedPermissions] = useState(permissions);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = (key) => {
    setUpdatedPermissions((prev) => {
      const newPermissions = { ...prev, [key]: !prev[key] };
      onUpdate(newPermissions);
      return newPermissions;
    });
  };

  return (
    <>
    
    <div className={styles.container}>
        <Label label={permissions.server_group_name} />
        <button className={styles.button} onClick={toggleMenu}>Edit Permissions</button>
    </div>
    {isOpen && (

        <div onClick={() => {setIsOpen(false)}} className={styles.menu}>
            <div onClick={(e) => {e.stopPropagation()}} className={styles.wrapper}>
                <Label label={`Edit permissions for ${permissions.server_group_name}:`} />
                {Object.keys(updatedPermissions).map((key) => (
                    typeof updatedPermissions[key] === "boolean" && key !== 'admin' && (
                    <BoolInput key={key} name={key} value={updatedPermissions[key]} onChange={() => {handleToggle(key)}} />
                    )
                ))}
            </div>
        </div>
      )}
    </>
  );
};

export default PermissionsMenu;
