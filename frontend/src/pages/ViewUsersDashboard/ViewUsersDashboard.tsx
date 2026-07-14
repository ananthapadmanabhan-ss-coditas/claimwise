import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import styles from "./ViewUsersDashboard.module.scss"
import CreateUser from "../../features/admin/components/CreateUser/CreateUser";
const ViewUsersDashboard=()=>{
  const [createUser,setCreateUser]=useState(false)
  return(
    <section className={styles.container}>
            <div className={styles.header}>
                <h1>USERS LIST</h1>
                <Button className={styles.padded}onClick={()=>setCreateUser(true)}>Invite+</Button>
            </div>

            <div className={styles.courseGrid}>
                
            </div>
    {createUser && <CreateUser setModal={setCreateUser}/>}
    </section>
  );
}
export default ViewUsersDashboard