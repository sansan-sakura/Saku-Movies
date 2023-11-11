import { createContext, useContext, useMemo, useState } from "react";
import useFetchData from "../hooks/useFetchData";
const SearchMovieContext = createContext();

const SearchMovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("movie");
  const [chosenGenre, setChosenGenre] = useState("");
  const genreSearchPath = useMemo(() => {
    return chosenGenre ? `discover/movie?language=en-US&with_genres=${chosenGenre}` : null;
  }, [chosenGenre]);

  const qurrySearchPath = useMemo(() => {
    console.log(option);
    return option && query
      ? option === "company"
        ? `search/company?query=${query}&page=1`
        : `search/${option}?language=en-US&query=${query}&include_adult=false&page=1`
      : null;
  }, [option, query]);
  console.log(qurrySearchPath);
  const {
    data: movieByGenreData,
    error: movieByGenreError,
    isLoading: movieByGenreLoading,
  } = useFetchData({
    path: genreSearchPath,
    id: `searchByGenre/${chosenGenre}`,
  });

  const {
    data: movieByQueryData,
    error: movieByQueryError,
    isLoading: movieByQueryLoading,
  } = useFetchData({
    path: qurrySearchPath,
    id: `searchByQuery/${option}/${query}`,
  });

  return (
    <SearchMovieContext.Provider
      value={{
        movieByGenreData,
        movieByGenreError,
        movieByGenreLoading,
        movieByQueryData,
        movieByQueryError,
        movieByQueryLoading,
        chosenGenre,
        query,
        option,
        setChosenGenre,
        setQuery,
        setOption,
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
