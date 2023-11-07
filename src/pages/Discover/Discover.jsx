import { Title } from "../../components/Title";
import styles from "./Discover.module.scss";
//api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`
// https:

export const Discover = () => {
  return (
    <div className={styles.dicover}>
      <div className={styles.dicover_inner}>
        <div className={styles.search_box}>
          <Title des="Movies, TV shows, and Celebrities">Discover</Title>
          <select>
            <option>Movie</option>
            <option>TV shows</option>
            <option>Celebs</option>
            <option>Key words</option>
            <option>Celebs</option>
          </select>
          <input type="text" />
        </div>
        <div className={styles.discover_inner_under}>
          <Title>Discover by Genre</Title>
        </div>
      </div>
    </div>
  );
};
