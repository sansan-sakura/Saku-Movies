import { useMemo } from "react";
import styles from "./MainSlider.module.scss";
import { Slider } from "../Slider";
import { MovieCard } from "../MovieCard";
import HorizontalCard from "../HorizontalCard/HorizontalCard";

function MainSlider({ windowWidth, movies, horizontal = true }) {
  const currentSliderImageWidth = useMemo(() => {
    return (windowWidth * 0.84) / 2;
  }, [windowWidth]);

  const moviesArr = Object.values(movies);

  return (
    <>
      <div className={styles.slider_wrapper}>
        {/* <h3 className={styles.title}>{Object.keys(movies)}</h3> */}
        <Slider currentImageWidth={currentSliderImageWidth}>
          {moviesArr.map((movie) => (
            <li className={styles.scroll_item} key={movie.id}>
              {horizontal ? <HorizontalCard movie={movie} /> : <MovieCard movie={movie} />}
            </li>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default MainSlider;
