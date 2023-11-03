import styles from "./HeroCarousel.module.scss";
import { Slider } from "../Slider";
import { useHeroCarousel } from "../../context/HeroCarouselContext";

function HeroCarousel() {
  const { toggleActive, handleToggleActive, heroRef, itemRef, currentIndex, itemWidth, movies } =
    useHeroCarousel();
  if (!movies) return console.log("not yet");
  console.log(itemRef);
  return (
    <>
      <div className={styles.carousel_outer}>
        <Slider currentImageWidth={itemWidth} heroRef={heroRef} onchange={toggleActive}>
          {movies.map((movie, i) => (
            <>
              <li key={movie.id} className={styles.hero_image_wrapper} ref={itemRef}>
                <div className={styles.hero_img_inner_wrapper}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    key={movie.id}
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
                        key={i}
                        className={styles.pagination}
                        style={{
                          backgroundColor: currentIndex === i ? "#fff" : "",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </li>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HeroCarousel;
