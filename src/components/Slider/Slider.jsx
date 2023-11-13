import { Button } from "../Button";
import { useRef, useEffect } from "react";

import styles from "./Slider.module.scss";

function Slider({
  children,
  currentImageWidth,
  onHeroRef = null,
  onchange = null,
  btnLeftStyle = null,
  btnRightStyle = null,
  btnType = null,
}) {
  const sliderRef = useRef();
  useEffect(() => {
    if (onHeroRef) onHeroRef(sliderRef);
  }, [onHeroRef, sliderRef]);

  function handleClickToLeft() {
    sliderRef.current.scrollLeft -= currentImageWidth;
  }

  function handleClickToRight() {
    sliderRef.current.scrollLeft += currentImageWidth;
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
        <ul className={styles.slider_inner} ref={sliderRef} onScroll={onchange}>
          {children}
        </ul>
      </div>
    </>
  );
}

export default Slider;
