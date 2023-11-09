import { createContext, useContext, useMemo, useState } from "react";
import useFetchData from "../hooks/useFetchData";
const SearchMovieContext = createContext();

const SearchMovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [chosenGenre, setChosenGenre] = useState("");
  const genreSearchPath = useMemo(() => {
    return chosenGenre ? `discover/movie?language=en-US&with_genres=${chosenGenre}` : null;
  }, [chosenGenre]);

  const {
    data: movieByGenreData,
    error: movieByGenreError,
    isLoading: movieByGenreLoading,
  } = useFetchData({
    path: genreSearchPath,
    id: `searchByGenre/${chosenGenre}`,
  });
  console.log(movieByGenreData, chosenGenre);
  return (
    <SearchMovieContext.Provider
      value={{
        movieByGenreData,
        movieByGenreError,
        movieByGenreLoading,
        chosenGenre,
        setChosenGenre,
        setQuery,
      }}
    >
      {children}
    </SearchMovieContext.Provider>
  );
};

const useSearchMovie = () => {
  const context = useContext(SearchMovieContext);
  if (context === undefined)
    throw new Error("useMovieSearch must be used inside of SearchMovieContext");
  return context;
};

export { useSearchMovie, SearchMovieProvider };
