import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import type { SidebarProps } from "./SideBar.types";

const Sidebar = ({ items }: SidebarProps) => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.navigation}>
                {items.map((item) => (
                    <NavLink key={item.path}to={item.path}className={( {isActive} ) =>
                            isActive? `${styles.link} ${styles.active}`: styles.link
                        }>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;