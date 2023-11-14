import styles from "./SmallSlider.module.scss";
import { Slider } from "../Slider";
import { useState, useRef, useCallback, useEffect } from "react";
export const SmallSlider = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(0);
  const imageRef = useRef(null);
  const getWidth = useCallback(() => {
    if (!imageRef.current) return;
    setItemWidth(imageRef.current.offsetWidth);
  }, [imageRef]);

  useEffect(() => {
    getWidth();
  }, [imageRef, getWidth]);
  return (
    <div className={styles.carousel_wrapper}>
      <Slider
        key="smallSlider"
        currentImageWidth={itemWidth}
        btnLeftStyle={{ transform: "translate(-30px,-30px)" }}
        btnRightStyle={{ transform: "translate(38px,-30px)" }}
        btnType="herobtn"
      >
        {images.map((i) => (
          <li key={i.file_path} ref={imageRef}>
            <img src={`https://image.tmdb.org/t/p/original${i.file_path}`} />
          </li>
        ))}
      </Slider>
    </div>
  );
};
