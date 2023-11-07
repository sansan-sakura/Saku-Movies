import { Link } from "react-router-dom";
import styles from "./StarCard.module.scss";

export const StarCard = ({ movie }) => {
  return (
    <>
      {movie.profile_path && (
        <Link to={`/star/${movie.id}`}>
          <div className={styles.card}>
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.profile_path}`}
              className={styles.img}
            />
            <h4>{movie.name}</h4>
          </div>
        </Link>
      )}
    </>
  );
};
