import { createContext, useContext } from "react";

// import { Loading } from "../Loading";
// import { Error } from "../Error";
import useFetchData from "../hooks/useFetchData";

const GenreContext = createContext();

const GenreProvider = ({ children }) => {
  const { data, error, isLoading } = useFetchData({
    id: "getGenre",
    path: "/genre/movie/list?language=en",
  });

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const genres = data.genres;
  console.log(genres);
  return <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>;
};

const useGenre = () => {
  const context = useContext(GenreContext);
  if (context === undefined) throw new Error("Genre context was desined outside");

  return context;
};

export { useGenre, GenreProvider };
