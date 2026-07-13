import styles from "./AuthLayout.module.scss";
import type { AuthLayoutProps } from "./AuthLayout.types";

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className={styles.authLayout}>
            <div className={styles.authContainer}>
                {children}
            </div>
        </main>
    );
};

export default AuthLayout;