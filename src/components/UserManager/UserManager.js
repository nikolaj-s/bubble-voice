import React from "react";
import styles from "./UserManager.module.css";
import Label from "../ui/Titles/Label/Label";
import Dropdown from "../ui/Inputs/DropDown/DropDown";
import MiniUserCard from "../ui/Cards/MiniUserCard/MiniUserCard";
import Header from "../ui/Titles/Header/Header";
import IconButton from "../ui/Buttons/IconButton/IconButton";
import { Ban } from "lucide-react";
import TextInput from "../ui/Inputs/TextInput/TextInput";
import { LineSpacer } from "../ui/Spacers/LineSpacer/LineSpacer";

const UserManager = ({ users, serverGroups, onChangeUserGroup, permissions, handleBan = () => {} }) => {

    const [query, setQuery] = React.useState("");
    // Sort groups with admin groups first
    const sortedGroups = Object.values(serverGroups).sort((a, b) => b.admin - a.admin);

    return (
        <div className={styles.container}>
            <Header text="Manage Users" />
            <TextInput placeholder={"Filter"} value={query} onChange={setQuery} />
            <LineSpacer />
            {sortedGroups.map((group) => (
                <div key={group._id} className={styles.groupContainer}>
                    {/* Group Header */}
                    <Label label={group.server_group_name} />

                    {/* Users in the Group */}
                    <div className={styles.userList}>
                        {Object.values(users)
                        .filter(user => user.server_group === group._id && user.display_name.toLowerCase().includes(query.toLowerCase()))
                        .map(user => (
                        <div key={user.user_id} className={styles.userCard}>
                            <MiniUserCard {...user} />
                            {/* Only show the select dropdown for non-admin users */}
                            {!group.admin && (
                                <Dropdown 
                                selected={serverGroups[user.server_group]}
                                options={sortedGroups.filter(g => !g.admin) } 
                                selector="server_group_name" 
                                setSelected={(value) => {
                                    onChangeUserGroup(user.user_id, value._id)
                                }} />
                            )}
                            {permissions.user_can_ban_users && !group.admin && (
                            <IconButton 
                            title={`Ban ${user.display_name}`}
                            Icon={<Ban color="var(--error-color)" />}
                            onClick={() => {handleBan(user)}}
                            width={30}
                            height={30}
                            />
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserManager;

