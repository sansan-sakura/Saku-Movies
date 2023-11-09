import { useState } from "react";
import styles from "./HorizontalCard.module.scss";
import { Link } from "react-router-dom";
import { useGenre } from "../../context/GenreContext";

function HorizontalCard({ movie, tv = true }) {
  const [onMouse, setOnMouse] = useState(false);
  const { genres } = useGenre();

  const { title = null, name = null, backdrop_path: poster, id, vote_average } = movie;

  const genre = genres.find((obj) => {
    return obj.id === movie.genre_ids[0];
  });

  return (
    <>
      {poster && (
        <div className={styles.card_outer}>
          <Link to={`/${tv ? "tv" : "movie"}/${id}`}>
            <div
              className={styles.card_wrapper}
              onMouseEnter={() => setOnMouse(true)}
              onMouseLeave={() => setOnMouse(false)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w780${poster}`}
                style={{ filter: onMouse ? "brightness(60%)" : "" }}
              />
            </div>
          </Link>
          <div className={styles.description}>
            <div>
              <p className={styles.genre}>{genre ? genre.name : ""}&nbsp;</p>
              <p className={styles.title}>{title ? title : name}</p>
            </div>
            <div>
              <span>⭐️</span> <span>{vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HorizontalCard;
