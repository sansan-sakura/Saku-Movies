import styles from "./Heading.module.scss";
export const Heading = ({ children }) => {
  return <h2 className={styles.h2}>{children}</h2>;
};
