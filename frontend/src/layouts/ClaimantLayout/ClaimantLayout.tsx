import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/SideBar/SideBar";
import styles from "./ClaimantLayout.module.scss"

const ClaimantLayout=()=>{
  const ClaimantSidebarItems=[
    {
      path:"/claimant/portal",
      label:"CLAIMENT PORTAL"
    }
  ]
  return(
        <div className={styles.container}>
                
          <Sidebar items={ClaimantSidebarItems} />

          <main className={styles.main}>
            <Outlet />
          </main>

        </div>
  );
}

export default ClaimantLayout