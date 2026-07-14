import { useState } from "react";

import styles from "./ClaimantPortal.module.scss";
import Button from "../../components/ui/Button/Button";

const ClaimantPortal=()=>{
  const [createClaim,setCreateClaim]=useState(false)
  //GET ALL CLAIMS
  return(
    <section className={styles.container}>
            <div className={styles.header}>
                <h1>View My Claims</h1>
                <Button onClick={()=>setCreateClaim(true)}>Make A Claim +</Button>
            </div>

            <div className={styles.courseGrid}>
                
            </div>
      {/* {createClaim && <CreateClaimModal setModal={setCreateClaim}/>} */}
    </section>
  );
}
export default ClaimantPortal