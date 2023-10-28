import styles from "./Button.module.scss";
function Button({ handleClick = null, buttonStyle = {}, type }) {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      onClick={handleClick}
      style={buttonStyle}
    >
      <img src="/right-arrow.svg" />
    </button>
  );
}

export default Button;
