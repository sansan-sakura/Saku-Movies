import { Title } from "../../components/Title";
import { useGenre } from "../../context/GenreContext";
import styles from "./Discover.module.scss";
import { useSearchMovie } from "../../context/SearchMovieContext";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

export const Discover = () => {
  const { genres } = useGenre();
  const { setChosenGenre, setOption, setQuery, option } = useSearchMovie();
  const navigate = useNavigate();

  function handleSearchByGenre(e) {
    setChosenGenre(e.target.value);
    return navigate("/search/result");
  }

  function handleSearchByQuery() {
    return navigate("/search/query/result");
  }

  return (
    <div className={styles.dicover}>
      <div className={styles.dicover_inner}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          &#x3c; BACK
        </button>
        <div className={styles.form}>
          <div className={styles.form_upper}>
            <Title margleft="0">Discover</Title>
            <p>Movies, TVshows, Celebs, and Key Words</p>
            <div className={styles.upper_select}>
              <select
                className={styles.options}
                onChange={(e) => setOption(e.target.value)}
                value={option}
              >
                <option value="movie">Movie</option>
                <option value="tv">TV shows</option>
                <option value="person">People</option>
                <option value="keyword">Key words</option>
                <option value="company">company</option>
              </select>
              <input
                type="text"
                className={styles.select_input}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className={styles.button_icon} onClick={handleSearchByQuery}>
                <HiSearch className={styles.icon} />
              </button>
            </div>
          </div>
          <div className={styles.form_under}>
            <Title margleft="0">Discover Movies by Genre</Title>
            <select onChange={handleSearchByGenre}>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
