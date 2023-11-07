import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMovie } from "./MovieContext";

const HeroCarouselContext = createContext();

function HeroCarouselProvider({ children }) {
  const { nowPlayingMovies } = useMovie();
  console.log("hero");
  const movies = useMemo(() => nowPlayingMovies.slice(0, 8), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const heroRef = useRef(null);
  const itemRef = useRef(null);

  const getWidth = useCallback(() => {
    if (!itemRef.current) return;
    setItemWidth(itemRef.current.offsetWidth);
  }, [itemRef]);

  useEffect(() => {
    getWidth();
  }, [getWidth]);

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [getWidth]);

  function toggleActive() {
    setCurrentIndex(
      heroRef.current !== null ? Math.round(heroRef.current.scrollLeft / itemWidth) : null
    );
  }

  function handleToggleActive(index) {
    if (!heroRef) return;
    setCurrentIndex(index);
    if (index > currentIndex) {
      heroRef.current.scrollLeft += itemWidth * (index - currentIndex);
    } else if (index <= currentIndex) {
      heroRef.current.scrollLeft -= itemWidth * (currentIndex - index);
    }
  }

  useEffect(() => {
    function changeSlide() {
      if (currentIndex < movies.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        heroRef.current.scrollLeft += itemWidth;
      } else if (currentIndex === movies.length - 1) {
        heroRef.current.scrollLeft -= itemWidth * movies.length;
        setCurrentIndex(0);
      }
    }
    if (!heroRef) return;
    // const interval = setInterval(changeSlide, 5000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [currentIndex, itemWidth, movies, heroRef]);

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
        toggleActive,
        handleToggleActive,
        heroRef,
        itemRef,
        currentIndex,
        itemWidth,
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
