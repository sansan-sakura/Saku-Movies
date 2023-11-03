import { PlayButton } from "../PlayButton";
import styles from "./HeroAside.module.scss";
import useFetchMovie from "../../hooks/useFetchMovie";
import { useHeroCarousel } from "../../context/HeroCarouselContext";

export const HeroAside = () => {
  const { asideMovies, currentIndex } = useHeroCarousel();
  console.log(asideMovies, currentIndex);
  return (
    <aside className={styles.aside}>
      <h3>Up Coming</h3>
      <div className={styles.aside_inner}>
        {asideMovies.map((movie) => (
          <AsideCard key={movie.id} id={movie.id} title={movie.title} path={movie.poster_path} />
        ))}
      </div>
    </aside>
  );
};

function AsideCard({ id, title, path }) {
  const { startVideo, setTriggerMovie, setStartVideo } = useFetchMovie(id);
  function togglePlay() {
    if (startVideo.start) {
      setStartVideo((prev) => ({ ...prev, start: false }));
      setTriggerMovie((prev) => ({ ...prev, trigger: true }));
    } else {
      setStartVideo((prev) => ({ ...prev, start: true }));
      setTriggerMovie((prev) => ({ ...prev, trigger: false }));
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.left_side}>
        <img src={`https://image.tmdb.org/t/p/w780${path}`} />
      </div>
      <div className={styles.right_side}>
        <div className={styles.button}>
          <PlayButton
            handleClick={togglePlay}
            key={id}
            width="40px"
            position="3px"
            display="block"
          />
        </div>
        <h5>{title}</h5>
      </div>
    </div>
  );
}
