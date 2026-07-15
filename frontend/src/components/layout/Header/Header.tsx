import Button from "../../ui/Button/Button";
import logo from "../../../assets/undraw_cabin_7fei.png"
import styles from "./Header.module.scss";
import notification from "../../../assets/undraw_mail-sent_ujev.png"

const Header = () => {
    //INTERGRATE APIS HERE
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                    <img
                        src={logo}
                        alt="claimWISE Logo"
                    />
                <h1>claim<span>W</span>ise</h1>
            </div>
           
            <div className={styles.right}>
                <img src={notification}/> {/*image  should be cliclable because we will show notifications drop down from here*/}
                <span className={styles.userName}>
                    Welcome, <span>DADDY!</span>
                </span>

                <Button variant="error">
                    Logout
                </Button>
            </div>
            
        </header>
    );
};

export default Header;