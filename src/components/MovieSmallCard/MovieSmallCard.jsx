import { Link } from "react-router-dom";
import styles from "./MovieSmallCard.module.scss";

export const MovieSmallCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
      <p>{movie.title}</p>
      <Link to={`/movie/${movie.id}`}> Check This Movie</Link>
    </div>
  );
};
