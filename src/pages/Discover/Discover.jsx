import { useState } from "react";
import { Title } from "../../components/Title";
import { useGenre } from "../../context/GenreContext";
import styles from "./Discover.module.scss";
import { useSearchMovie } from "../../context/SearchMovieContext";
import { useNavigate } from "react-router-dom";
//api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`
// https:

export const Discover = () => {
  const { genres } = useGenre();
  const { setChosenGenre } = useSearchMovie();
  const navigate = useNavigate();

  function handleSearchByGenre(e) {
    setChosenGenre(e.target.value);
    return navigate("/search/result");
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
            <div>
              <select>
                <option>Movie</option>
                <option>TV shows</option>
                <option>Celebs</option>
                <option>Key words</option>
                <option>Celebs</option>
              </select>
              <input type="text" />
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
