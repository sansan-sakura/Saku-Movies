import { PlayButton } from "../PlayButton";
import styles from "./HeroAside.module.scss";
import useFetchMovie from "../../hooks/useFetchMovie";

export const HeroAside = ({ movies }) => {
  return (
    <aside className={styles.aside}>
      <div className={styles.aside_inner}>
        <h3>Up Coming</h3>
        {movies.map((movie) => (
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
      <PlayButton handleClick={togglePlay} key={id} />
      <div className={styles.right_side}>
        <h5>{title}</h5>
      </div>
    </div>
  );
}
