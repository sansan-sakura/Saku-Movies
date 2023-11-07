import { HeroAside } from "../HeroAside/HeroAside";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
import styles from "./Hero.module.scss";
import useScreenSize from "../../hooks/useScreenSize";

export const Hero = () => {
  const [windowWidth] = useScreenSize();

  return (
    <div className={styles.hero_inner}>
      <HeroCarousel />
      {windowWidth > 1000 ? <HeroAside /> : null}
    </div>
  );
};
