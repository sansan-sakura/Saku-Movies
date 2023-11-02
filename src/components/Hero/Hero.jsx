import { HeroAside } from "../HeroAside/HeroAside";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
import styles from "./Hero.module.scss";

export const Hero = ({ movies, windowWidth }) => {
  return (
    <>
      <HeroCarousel movies={movies} windowWidth={windowWidth} />
      <HeroAside movies={movies} />
    </>
  );
};
