import { Button } from "../Button";
import { useRef } from "react";

import styles from "./Slider.module.css";

function Slider({
  children,
  currentImageWidth,
  heroRef = null,
  onchange = null,
  btnLeftStyle = null,
  btnRightStyle = null,
  btnType = null,
}) {
  const sliderRef = useRef();
  const carouselRef = heroRef ? heroRef : sliderRef;

  function handleClickToLeft() {
    carouselRef.current.scrollLeft -= currentImageWidth;
  }

  function handleClickToRight() {
    carouselRef.current.scrollLeft += currentImageWidth;
  }

  return (
    <>
      <Button
        type="right-click"
        handleClick={handleClickToRight}
        buttonStyle={btnRightStyle}
        btnType={btnType}
      />
      <Button
        type="left-click"
        handleClick={handleClickToLeft}
        buttonStyle={btnLeftStyle}
        btnType={btnType}
      />
      <div className={styles.slider_outer}>
        <ul className={styles.slider_inner} ref={carouselRef} onScroll={onchange}>
          {children}
        </ul>
      </div>
    </>
  );
}

export default Slider;
