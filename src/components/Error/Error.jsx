import styles from "./Error.module.scss";

function Error({ message = "Sorry, something went wrong!!" }) {
  return (
    <>
      <section className={styles.error_page}>
        <div className={styles.error_box}>
          <h3>💥 {message} 💥</h3>
        </div>
      </section>
    </>
  );
}

export default Error;
