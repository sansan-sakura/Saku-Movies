import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <h1>SAKU MOVIES</h1>
        <nav className={styles.nav}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Discover</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
