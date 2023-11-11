import { createContext, useContext } from "react";
import { Error } from "../components/Error";
import useMultipleUrls from "../hooks/useMultipleUrls";
import { urlsForHomePage as urls } from "../statics/urls";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const { data, error, isLoading } = useMultipleUrls(urls);

  if (isLoading) return console.log(isLoading);
  if (error) return <Error />;
  const [
    { results: popularMovies },
    { results: trendingMovies },
    { results: upcomingMovies },
    { results: nowPlayingMovies },
    { results: topRatedTvs },
    { results: airingTodayTvs },
    { results: popularTvs },
    { results: trendingPeople },
  ] = data;

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        trendingMovies,
        upcomingMovies,
        nowPlayingMovies,
        topRatedTvs,
        popularTvs,
        trendingPeople,
        airingTodayTvs,
        isLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

function useMovie() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("MovieContext was used outside the MovieProvider");
  }

  return context;
}

export { MovieProvider, useMovie };
