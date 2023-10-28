import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading_box}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
