import { createContext, useContext, useMemo, useState } from "react";
import { useMovie } from "./MovieContext";

const HeroCarouselContext = createContext();

function HeroCarouselProvider({ children }) {
  const { nowPlayingMovies } = useMovie();

  const movies = useMemo(() => nowPlayingMovies.slice(0, 8), [nowPlayingMovies]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const asideMovies = useMemo(() => {
    if (!movies) return;
    const startIndex = currentIndex + 1;
    const slideLeft = 2;
    const maxIndex = movies.length - 1;
    if (startIndex + slideLeft <= maxIndex) {
      return movies?.slice(startIndex, startIndex + slideLeft + 1);
    } else if (startIndex + slideLeft > maxIndex) {
      const firstMovies = movies?.slice(startIndex);
      return [...firstMovies, ...movies.slice(0, slideLeft + 1 - firstMovies.length)];
    }
  }, [movies, currentIndex]);

  return (
    <HeroCarouselContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        movies,
        asideMovies,
      }}
    >
      {children}
    </HeroCarouselContext.Provider>
  );
}

const useHeroCarousel = () => {
  const context = useContext(HeroCarouselContext);

  if (context === undefined) throw new Error("HeroCarouselContext was definded outside");
  return context;
};

export { HeroCarouselProvider, useHeroCarousel };
