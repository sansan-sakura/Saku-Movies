import { HeroAside } from "../HeroAside/HeroAside";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.hero_inner}>
      <HeroCarousel />
      <div className={styles.aside}>
        <HeroAside />
      </div>
    </div>
  );
};
