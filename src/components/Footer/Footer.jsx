import { useMemo } from "react";
import styles from "./Footer.module.scss";

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className={styles.footer}>
      <small>&copy; {year} SAKU MOVIES. All rights reserved. </small>
      <small className={styles.small}>Designed and coded by Sakura Tanaka</small>
    </footer>
  );
}

export default Footer;
