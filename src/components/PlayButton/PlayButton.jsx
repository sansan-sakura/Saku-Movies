import styles from "./PlayButton.module.scss";

export const PlayButton = ({
  handleClick,
  width = "60px",
  position = "6px",
  display = "absolute",
}) => {
  return (
    <button
      className={styles.controler}
      onClick={handleClick}
      style={{ width: width, height: width, display: display }}
    >
      <img src="/right-arrow.svg" style={{ transform: `translateX(${position})` }} />
    </button>
  );
};
