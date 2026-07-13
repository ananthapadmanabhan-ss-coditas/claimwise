import Button from "../../ui/Button/Button";
import logo from "../../../assets/undraw_cabin_7fei.png"
import styles from "./Header.module.scss";
import notification from "../../../assets/undraw_mail-sent_ujev.png"

const Header = () => {
    //INTERGRATE APIS HERE
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <img
                        src={logo}
                        alt="claimWISE Logo"
                    />

                    <h1>claimWISE</h1>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.panel}>
                    <img src={notification}/> {/*image  should be cliclable because we will show notifications drop down from here*/}
                <span className={styles.userName}>
                    Welcome, DADDY!
                </span>

                <Button variant="error">
                    Logout
                </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;