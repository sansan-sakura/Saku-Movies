import styles from "./PageNotFound.module.scss";
function PageNotFound() {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.inner_wrapper}>
          <div className={styles.outer_box}></div>
          <div className={styles.text_box}>
            <h3 className={styles.text}>Page Not Found</h3>
            <p className={styles.num}>404</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;
