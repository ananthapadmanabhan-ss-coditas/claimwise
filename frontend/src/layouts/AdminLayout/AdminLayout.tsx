import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/SideBar/SideBar";
import styles from "./AdminLayout.module.scss"

const AdminLayout=()=>{
  const AdminSidebarItems=[
    {
      path:"users",
      label:"USERS"
    },
    {
      path:"categories",
      label:"CATEGORIES"
    },
    {
      path:"assignments",
      label:"ASSIGNMENTS"
    }
  ]
  return(
        <div className={styles.container}>
                
          <Sidebar items={AdminSidebarItems} />

          <main className={styles.main}>
            <Outlet />
          </main>

        </div>
  );
}

export default AdminLayout