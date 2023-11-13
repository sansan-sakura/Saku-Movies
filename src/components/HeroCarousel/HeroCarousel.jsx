import styles from "./HeroCarousel.module.scss";
import { Slider } from "../Slider";
import { useHeroCarousel } from "../../context/HeroCarouselContext";
import { Loading } from "../Loading";
import { useEffect, useRef, useState, useCallback } from "react";

function HeroCarousel() {
  const itemRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [heroRef, setHeroRef] = useState(null);
  const { currentIndex, movies, setCurrentIndex } = useHeroCarousel();

  const getWidth = useCallback(() => {
    if (!itemRef) return;
    setItemWidth(itemRef.current.offsetWidth);
  }, [itemRef]);

  useEffect(() => {
    getWidth();
  }, [getWidth]);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [getWidth]);

  function toggleActive() {
    setCurrentIndex(
      heroRef.current !== null ? Math.round(heroRef.current.scrollLeft / itemWidth) : null
    );
  }

  function handleToggleActive(index) {
    if (!heroRef) return;
    setCurrentIndex(index);
    if (index > currentIndex) {
      heroRef.current.scrollLeft += itemWidth * (index - currentIndex);
    } else if (index <= currentIndex) {
      heroRef.current.scrollLeft -= itemWidth * (currentIndex - index);
    }
  }

  useEffect(() => {
    function changeSlide() {
      if (currentIndex < movies.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        heroRef.current.scrollLeft += itemWidth;
      } else if (currentIndex === movies.length - 1) {
        heroRef.current.scrollLeft -= itemWidth * movies.length;
        setCurrentIndex(0);
      }
    }
    if (!heroRef) return;
    const interval = setInterval(changeSlide, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, itemWidth, movies, heroRef, setCurrentIndex]);

  if (!movies) return <Loading />;
  return (
    <>
      <div className={styles.carousel_outer}>
        <Slider
          currentImageWidth={itemWidth}
          onHeroRef={setHeroRef}
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
                    <div className={styles.inner_image_box_inner_des}>
                      <h2>{movie.title}</h2>
                      <p>{movie.overview.split(" ").slice(0, 18).join(" ")}...</p>
                    </div>
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
