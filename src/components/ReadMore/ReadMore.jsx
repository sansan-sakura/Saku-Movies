import styles from "./ReadMore.module.scss";

export const ReadMore = ({ children, path = null, onClick = null, el = "a" }) => {
  const ButtonEl = el === "a" ? "a" : "button";
  return (
    <ButtonEl href={path} className={styles.button} onClick={onClick}>
      {children}
    </ButtonEl>
  );
};
