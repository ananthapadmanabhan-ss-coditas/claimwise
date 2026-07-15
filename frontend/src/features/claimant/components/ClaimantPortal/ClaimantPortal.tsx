import { useState } from "react";

import styles from "./ClaimantPortal.module.scss";
import Button from "../../../../components/ui/Button/Button";
import CreateClaimModal from "../CreateClaimModal/CreateClaimModal";
import { useGetAllClaimsQuery } from "../../services/claimapi";
import Loader from "../../../../components/feedback/Loader/Loader";
import ClaimCard from "../ClaimCard/ClaimCard";

const ClaimantPortal=()=>{
  const [createClaim,setCreateClaim]=useState(false)

  const {data:claims,isLoading}=useGetAllClaimsQuery()
    
  if(isLoading)
    return <Loader/>
  
  
  return(
    <section className={styles.container}>
            <div className={styles.header}>
                <h1>View My Claims</h1>
                <Button onClick={()=>setCreateClaim(true)}>Make A Claim +</Button>
            </div>

            <div className={styles.courseGrid}>
                {
                  claims?.map((claim)=>(
                    <ClaimCard key={claim.id} claim={claim}/>
                  ))
                }
            </div>
      {createClaim && <CreateClaimModal setModal={setCreateClaim}/>}
    </section>
  );
}
export default ClaimantPortal
