import styles from "./Button.module.scss";

function Button({ handleClick = null, buttonStyle = {}, type, btnType = null }) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[btnType]}`}
      onClick={handleClick}
      style={buttonStyle}
    >
      <img src="/right-arrow.svg" />
    </button>
  );
}

export default Button;
