import { PlayButton } from "../PlayButton";
import styles from "./HeroAside.module.scss";
import useFetchMovie from "../../hooks/useFetchMovie";
import { useHeroCarousel } from "../../context/HeroCarouselContext";
import { Modal } from "../Modal";

export const HeroAside = () => {
  const { asideMovies } = useHeroCarousel();

  return (
    <aside className={styles.aside}>
      <h3>Up Coming</h3>
      <div className={styles.aside_inner}>
        {asideMovies.map((movie) => (
          <AsideCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            path={movie.poster_path}
            overview={movie.overview}
            date={movie.release_date}
          />
        ))}
      </div>
    </aside>
  );
};

function AsideCard({ id, title, path, date, overview }) {
  const { startVideo, setTriggerMovie, setStartVideo } = useFetchMovie(id);
  function togglePlay() {
    if (startVideo.start) {
      setStartVideo((prev) => ({ ...prev, start: false }));
      setTriggerMovie((prev) => ({ ...prev, trigger: false }));
    } else {
      setStartVideo((prev) => ({ ...prev, start: true }));
      setTriggerMovie((prev) => ({ ...prev, trigger: true }));
    }
  }
  return (
    <div className={styles.card}>
      {startVideo.start && (
        <AsideVideoPlayer startVideo={startVideo} id={id} setStartVideo={setStartVideo} />
      )}
      <div className={styles.left_side}>
        <img src={`https://image.tmdb.org/t/p/w780${path}`} />
      </div>
      <div className={styles.right_side}>
        <div className={styles.button}>
          <PlayButton
            handleClick={togglePlay}
            key={id}
            width="34px"
            position="2px"
            display="block"
          />
        </div>
        <h5>{title}</h5>
        <p className={styles.date}>released: {date}</p>
        <p>{overview.split(" ").slice(0, 10).join(" ") + "..."}</p>
      </div>
    </div>
  );
}

function AsideVideoPlayer({ id, startVideo, setStartVideo }) {
  console.log(startVideo);
  return (
    <Modal>
      <button
        className={styles.close_btn}
        onClick={() => setStartVideo((prev) => ({ ...prev, start: false }))}
      >
        &#x2715;
      </button>
      <div
        className={styles.hero_video_box}
        style={{ display: startVideo.start ? "block" : "none" }}
      >
        <iframe
          style={{ height: "600px", width: "800px" }}
          className={styles.video}
          id="player"
          src={`${startVideo.url}`}
        ></iframe>
      </div>
    </Modal>
  );
}
