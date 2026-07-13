import styles from "./LoginForm.module.scss";
import EmailForm from "../EmailForm/EmailForm";
import { useState } from "react";
import OTPForm from "../OTPForm/OTPForm";

const LoginForm = () => {
    const [form,setForm]=useState("email")
    return (
        <section className={styles.authForm}>
            <div className={styles.header}>
                <h1>Welcome to claimWISE</h1>
                <p>Sign in to claim it wisely😉</p>
            </div>

            <div className={styles.body}>
            {form==="email" && <EmailForm form={setForm}/>}
            {form==="OTP" && <OTPForm/>}
            </div>
        </section>
    );
};

export default LoginForm;