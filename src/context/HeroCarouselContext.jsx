import { createContext, useContext } from "react";

const HeroCarouselContext = createContext();

function HeroCarouselProvider() {
  return <HeroCarouselContext.Provider></HeroCarouselContext.Provider>;
}

const useHeroCarousel = () => {
  const context = useContext(HeroCarouselContext);

  if (context === undefined) throw new Error("HeroCarouselContext was definded outside");
  return context;
};

export { HeroCarouselProvider, useHeroCarousel };
