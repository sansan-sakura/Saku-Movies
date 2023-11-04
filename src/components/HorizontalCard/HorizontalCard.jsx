import { useState } from "react";
import useSWR from "swr";
import styles from "./HorizontalCard.module.scss";
import { Link } from "react-router-dom";

import { Loading } from "../Loading";
import { Error } from "../Error";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY, // eslint-disable-line
  },
};

const fetcher = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  ).then((response) => response.json());
  return data;
};

function HorizontalCard({ movie }) {
  const [onMouse, setOnMouse] = useState(false);

  const { title = null, name = null, backdrop_path: poster, id, vote_average } = movie;

  const { data, error, isLoading } = useSWR("getGenre", fetcher);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const genre = data.genres.find((obj) => {
    return obj.id === movie.genre_ids[0];
  });

  return (
    <>
      {poster && (
        <div className={styles.card_outer}>
          <Link to={`/tv/${id}`}>
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
