import { useState } from "react";
import styles from "./Modal.module.scss";

export const Modal = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
        &#x2715;
      </button>
      <div className={styles.modal_inner}>{content}</div>
    </div>
  );
};
