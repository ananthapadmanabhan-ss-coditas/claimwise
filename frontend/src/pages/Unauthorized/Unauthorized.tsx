import Button from "../../components/ui/Button/Button";
import styles from "./unauthorized.module.scss"
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h2>Access Denied</h2>
            <p>You do not have permission to access this page.</p>
            <Button onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </div>
    );
};

export default UnauthorizedPage;