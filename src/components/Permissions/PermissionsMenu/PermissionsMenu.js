import React from "react";

import styles from "./PermissionsMenu.module.css";

import Label from "../../ui/Titles/Label/Label";

import { useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setCurrentPermissionGroup } from "../../../features/ServerPermissions/serverPermissionsSlice";

import IconButton from "../../ui/Buttons/IconButton/IconButton";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { ImageComponent } from "../../ui/Image/Image";

import { BoxLabel } from "../../ui/Titles/BoxLabel/BoxLabel";
import { MiniUserPreview } from "../../ui/MiniUserPreview/MiniUserPreview";

const PermissionsMenu = ({ permissions, users = [], handleDelete = () => {} }) => {

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleMenu = () => {
    dispatch(setCurrentPermissionGroup(permissions._id));
    
    setSearchParams({section: 'editPermissionGroup'})
  };

  return (
    <div 
    data-context={JSON.stringify(permissions)}
    className={styles.container}>
      <div className={styles.header}>
        <Label label={permissions.server_group_name} />
      </div>
      <div className={styles.buttonWrapper}>
        <MiniUserPreview users={users} />
        {permissions.default_permissions && (
          <BoxLabel label={"Default"} />
        )}
        <IconButton
        Icon={<Pencil color="var(--text-color)" />}
        title={"Edit"}
        onClick={toggleMenu}
        
        />
        {!permissions.default_permissions && !permissions.admin && (<IconButton 
        title={"Delete"}
        Icon={<Trash2 color="var(--error-color)" />}
        onClick={() => {handleDelete(permissions)}}
        />)}
      </div>

    </div>
  );
};

export default PermissionsMenu;
