import { AlertTriangle } from "lucide-react";
import styles from "./FatalErrorPage.module.css";
import { useSelector } from "react-redux";
import { selectAccountError } from "../../features/Account/accountSlice";
import { useNavigate } from "react-router";
import TextButton from "../../components/ui/Buttons/TextButton/TextButton";
import { clearToken } from "../../lib/services/authService";
import { Card } from "../../components/ui/Wrappers/Card/Card";

const FatalErrorPage = ({ message = "An unexpected error occurred." }) => {

    const navigate = useNavigate();

    const accountError = useSelector(selectAccountError);

    const redirect = () => {

        clearToken();

        navigate('/login');
    
    }

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <AlertTriangle className={styles.icon} size={48} />
                <h1 className={styles.title}>Fatal Error</h1>
                <p className={styles.message}>{accountError || message}</p>
                <TextButton title="Login" action={redirect} />
            </Card>
        </div>
    );
};

export default FatalErrorPage;
