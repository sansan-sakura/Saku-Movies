import styles from "./SmallSlider.module.scss";
import { Slider } from "../Slider";
export const SmallSlider = ({ images, itemRef, totalWidth }) => {
  return (
    <div className={styles.carousel_wrapper}>
      <Slider
        key="smallSlider"
        currentImageWidth={totalWidth}
        btnLeftStyle={{ transform: "translate(-30px,-30px)" }}
        btnRightStyle={{ transform: "translate(38px,-30px)" }}
      >
        {images.map((i) => (
          <li key={i.file_path} ref={itemRef}>
            <img src={`https://image.tmdb.org/t/p/original${i.file_path}`} />
          </li>
        ))}
      </Slider>
    </div>
  );
};
