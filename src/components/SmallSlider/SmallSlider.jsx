import styles from "./SmallSlider.module.scss";
import { Slider } from "../Slider";
export const SmallSlider = ({ images, itemRef, totalWidth }) => {
  return (
    <div className={styles.carousel_wrapper}>
      <Slider currentImageWidth={totalWidth}>
        {images.map((i) => (
          <li key={i.file_path} ref={itemRef}>
            <img src={`https://image.tmdb.org/t/p/original${i.file_path}`} />
          </li>
        ))}
      </Slider>
    </div>
  );
};
