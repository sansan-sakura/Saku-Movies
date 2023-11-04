import { Link } from "react-router-dom"; //wrapping the entire movie card in a Link component so we'll be able to navigate to the movie details page when the movie poster is clicked
import { useState } from "react";
import styles from "./MovieCard.module.scss";

function MovieCard({ movie }) {
  const [onMouse, setOnMouse] = useState(false);
  const { title, release_date, poster_path: poster, id, vote_average } = movie;

  return (
    <>
      {poster && (
        <Link to={`/movie/${id}`}>
          <div
            className={styles.card_wrapper}
            onMouseEnter={() => setOnMouse(true)}
            onMouseLeave={() => setOnMouse(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${poster}`}
              style={{ filter: onMouse ? "brightness(60%)" : "" }}
            />
            <div className={styles.inner_card}>
              <p>⭐️ {vote_average.toFixed(1)}</p>
              <h3>{title}</h3>

              {/* <div className={styles.button_box}> */}
              {/* <ReadMoreBtn /> */}
              {/* </div> */}
              <button className={styles.button}>Ckeck Details </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default MovieCard;
