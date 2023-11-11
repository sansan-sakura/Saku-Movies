import styles from "./Title.module.scss";
export const Title = ({ children, des = "", margleft = "20px" }) => {
  return (
    <div className={styles.title_box} style={{ marginLeft: margleft }}>
      <h3 className={styles.title}>{children}</h3>
      {des && <p className={styles.des}>{des}</p>}
    </div>
  );
};
