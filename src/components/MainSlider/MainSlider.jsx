import { useMemo } from "react";
import styles from "./MainSlider.module.scss";
import { Slider } from "../Slider";
import { MovieCard } from "../MovieCard";
import HorizontalCard from "../HorizontalCard/HorizontalCard";
import { StarCard } from "../StarCard/StarCard";

function MainSlider({ windowWidth, movies, horizontal = true, starCard = false }) {
  const currentSliderImageWidth = useMemo(() => {
    return (windowWidth * 0.84) / 2;
  }, [windowWidth]);

  const moviesArr = Object.values(movies);

  return (
    <>
      <div className={styles.slider_wrapper}>
        <Slider currentImageWidth={currentSliderImageWidth}>
          {moviesArr.map((movie) => (
            <li className={styles.scroll_item} key={movie.id}>
              {!starCard && horizontal ? (
                <HorizontalCard movie={movie} />
              ) : !starCard ? (
                <MovieCard movie={movie} />
              ) : (
                <StarCard movie={movie} />
              )}
            </li>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default MainSlider;
