import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMovie } from "./MovieContext";
import useScreenSize from "../hooks/useScreenSize";

const HeroCarouselContext = createContext();

function HeroCarouselProvider({ children }) {
  const { nowPlayingMovies } = useMovie();
  const movies = nowPlayingMovies.slice(0, 5);
  const windowWidth = useScreenSize();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const heroRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    setItemWidth(itemRef.current.offsetWidth);
  }, [itemRef]);

  useEffect(() => {
    function getWidth() {
      setItemWidth(itemRef.current.offsetWidth);
    }
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [itemRef]);

  function toggleActive() {
    setCurrentIndex(
      heroRef.current !== undefined ? Math.round(heroRef.current.scrollLeft / windowWidth) : null
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

  // aslide +1
  const asideMovies = useMemo(() => {
    if (!movies) return;

    const startIndex = currentIndex + 1;
    const slideNum = 2;
    const maxIndex = movies.length - 1;

    if (startIndex + slideNum < maxIndex) {
      console.log("one");
      return movies.slice(startIndex, 3);
    } else if (startIndex < maxIndex && Math.abs(maxIndex - currentIndex) < slideNum + 1) {
      console.log("two", 3 - (maxIndex - startIndex));
      return [...movies.slice(startIndex, -1), ...movies.slice(0, 3 - maxIndex - startIndex)];
    } else {
      return movies.slice(0, 3);
    }
    // if (currentIndex + 3 < movies.length - 1) {
    //   return movies.slice(currentIndex + 1, 3);
    // } else if (currentIndex + 3 > movies.length - 1 && currentIndex + 1 < movies.length - 1) {
    //   const rest = movies.slice(currentIndex, -1);
    //   return [...rest, ...movies.slice(0, 3 - rest.length)];
    // } else if (currentIndex === movies.length - 1) {
    //   return movies(0, 3);
    // }
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
