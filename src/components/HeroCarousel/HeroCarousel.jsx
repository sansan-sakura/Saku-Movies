import styles from "./HeroCarousel.module.scss";
import { Slider } from "../Slider";
import { useHeroCarousel } from "../../context/HeroCarouselContext";
import { Loading } from "../Loading";
import { useRef } from "react";

function HeroCarousel() {
  const itemRef = useRef(null);
  const { toggleActive, handleToggleActive, heroRef, currentIndex, itemWidth, movies } =
    useHeroCarousel({ itemRef });
  console.log(itemRef);
  if (!movies) return <Loading />;
  return (
    <>
      <div className={styles.carousel_outer}>
        <Slider
          currentImageWidth={itemWidth}
          heroRef={heroRef}
          onchange={toggleActive}
          btnType="herobtn"
        >
          {movies.map((movie) => (
            <li key={movie.id} className={styles.hero_image_wrapper} ref={itemRef}>
              <div className={styles.hero_img_inner_wrapper}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className={styles.hero_image}
                />
                <div className={styles.inner_image_box}>
                  <div className={styles.inner_image_box_inner}>
                    <img
                      src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                      className={styles.poster_img}
                    />
                    <h2>{movie.title}</h2>
                  </div>
                </div>
                <div className={styles.pagination_box}>
                  {Array.from({ length: movies.length }, (_, i) => (
                    <div
                      onClick={() => handleToggleActive(i)}
                      key={movies[i].id}
                      className={styles.pagination}
                      style={{
                        backgroundColor: currentIndex === i ? "#fff" : "",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HeroCarousel;
