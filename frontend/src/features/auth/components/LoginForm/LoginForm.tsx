import styles from "./LoginForm.module.scss";
import EmailForm from "../EmailForm/EmailForm";
import { useState } from "react";
import OTPForm from "../OTPForm/OTPForm";

const LoginForm = () => {
    const [form,setForm]=useState("email")
    const [email,setEmail]=useState("")
    return (
        <section className={styles.authForm}>
            <div className={styles.header}>
                <h1>Welcome to claimWISE</h1>
                <p>Sign in to claim it wisely😉</p>
            </div>

            <div className={styles.body}>
            {form==="email" && <EmailForm form={setForm} setEmail={setEmail}/>}
            {form==="OTP" && <OTPForm email={email}/>}
            </div>
        </section>
    );
};

export default LoginForm;