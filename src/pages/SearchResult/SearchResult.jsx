import { useNavigate } from "react-router-dom";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { LoadingFullPage } from "../../components/LoaingFullPage";
import { Title } from "../../components/Title";
import { useGenre } from "../../context/GenreContext";
import { useSearchMovie } from "../../context/SearchMovieContext";
import styles from "./SearchResult.module.scss";

export const SearchResult = () => {
  const { movieByGenreData, movieByGenreError, movieByGenreLoading, chosenGenre } =
    useSearchMovie();
  const { genres } = useGenre();
  const navigate = useNavigate();
  if (movieByGenreError) return null;
  if (movieByGenreLoading) return <LoadingFullPage />;
  const genreName = genres.find((el) => el.id === Number(chosenGenre)).name;

  return (
    <div className={styles.result}>
      <div className={styles.result_inner}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          &#x3c; BACK
        </button>
        <Title des={`${genreName}`} margleft="0">
          Search Results
        </Title>
        <div className={styles.result_inner_movies}>
          {movieByGenreData.results.length > 0 &&
            movieByGenreData.results.map((movie) => (
              <HorizontalCard movie={movie} key={movie.id} tv={false} />
            ))}
        </div>
      </div>
    </div>
  );
};
