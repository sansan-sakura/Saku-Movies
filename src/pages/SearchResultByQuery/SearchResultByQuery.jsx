import styles from "./SearchResultByQuery.module.scss";
import { useNavigate } from "react-router-dom";
import HorizontalCard from "../../components/HorizontalCard/HorizontalCard";
import { Loading } from "../../components/Loading";
import { Title } from "../../components/Title";
import { useGenre } from "../../context/GenreContext";
import { useSearchMovie } from "../../context/SearchMovieContext";
import { StarCard } from "../../components/StarCard/StarCard";

export const SearchResultByQuery = () => {
  const { movieByQueryData, movieByQueryError, movieByQueryLoading, query, option } =
    useSearchMovie();
  const { genres } = useGenre();
  const navigate = useNavigate();
  if (movieByQueryError) return null;
  if (movieByQueryLoading) return <Loading />;
  //   const genreName = genres.find((el) => el.id === Number(chosenGenre)).name;
  console.log(movieByQueryData);
  return (
    <div className={styles.result}>
      <div className={styles.result_inner}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          &#x3c; BACK
        </button>
        <Title des={`option: ${option}  | keyword: ${query}`} margleft="0">
          Search Results
        </Title>
        <div className={styles.result_inner_movies}>
          {movieByQueryData.results.length > 0 &&
            movieByQueryData.results.map((movie) =>
              option === "person" ? (
                <StarCard key={movie.id} movie={movie} />
              ) : (
                <HorizontalCard movie={movie} key={movie.id} tv={option === "tv" ? true : false} />
              )
            )}
        </div>
      </div>
    </div>
  );
};
