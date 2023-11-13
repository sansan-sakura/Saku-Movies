import styles from "./Home.module.scss";
import { ScrollToTop } from "../../components/ScrollToTop";
import useScreenSize from "../../hooks/useScreenSize";
import { MainSlider } from "../../components/MainSlider";
import { Title } from "../../components/Title";
import { Heading } from "../../components/Heading/Heading";
import { Hero } from "../../components/Hero";
import { useMovie } from "../../context/MovieContext";

function Home() {
  const windowWidth = useScreenSize();
  const {
    trendingMovies,
    upcomingMovies,
    topRatedTvs,
    popularMovies,
    trendingPeople,
    airingTodayTvs,
  } = useMovie();

  return (
    <>
      <ScrollToTop />
      <div className={styles.container}>
        <div className={styles.hero_wrapper}>
          <Hero />
        </div>
        <div className={styles.inner_main}>
          <div>
            <Title des="Picked up Popular movies for you">Popular Movies</Title>
            <MainSlider windowWidth={windowWidth} movies={popularMovies} horizontal={false} />
          </div>
          <div>
            <Title des="Now in Trend">Trending Movies</Title>
            <MainSlider windowWidth={windowWidth} movies={trendingMovies} horizontal={false} />
          </div>
          <div>
            <Title des="Top Rated by our users">Top Rated TV shows</Title>
            <MainSlider windowWidth={windowWidth} movies={topRatedTvs} />
          </div>
          <div>
            <Heading>Explore upcoming movies</Heading>
            <Title des="Discover new movies">UP coming Movies</Title>
            <MainSlider windowWidth={windowWidth} movies={upcomingMovies} horizontal={false} />
          </div>
          <div>
            <Title>Airing Today's TVs</Title>
            <MainSlider windowWidth={windowWidth} movies={airingTodayTvs} />
          </div>
          <div>
            <Title>People</Title>
            <MainSlider windowWidth={windowWidth} movies={trendingPeople} starCard={true} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
