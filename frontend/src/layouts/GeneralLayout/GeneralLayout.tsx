import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import styles from "./GeneralLayout.module.scss"

const GeneralLayout=()=>{
  return(
    <div className={styles.layout}>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default GeneralLayout