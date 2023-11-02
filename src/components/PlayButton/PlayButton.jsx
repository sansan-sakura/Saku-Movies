import styles from "./PlayButton.module.scss";

export const PlayButton = ({ handleClick }) => {
  return (
    <button className={styles.controler} onClick={handleClick}>
      <img src="/right-arrow.svg" />
    </button>
  );
};
