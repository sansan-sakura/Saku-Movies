import { createContext, useContext } from "react";
import { Error } from "../components/Error";
import useFetchData from "../hooks/useFetchData";
import { LoadingFullPage } from "../components/LoaingFullPage";

const GenreContext = createContext();

const GenreProvider = ({ children }) => {
  const { data, error, isLoading } = useFetchData({
    id: "getGenre",
    path: "/genre/movie/list?language=en",
  });

  if (isLoading) return <LoadingFullPage />;
  if (error) return <Error />;

  const genres = data.genres;

  return <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>;
};

const useGenre = () => {
  const context = useContext(GenreContext);
  if (context === undefined) throw new Error("Genre context was desined outside");

  return context;
};

export { useGenre, GenreProvider };
