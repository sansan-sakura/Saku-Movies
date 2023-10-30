import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { MovieCard } from "../../components/MovieCard";
// import { Loading } from "../../components/Loading";
import useFetchData from "../../hooks/useFetchData";
import { ScrollToTop } from "../../components/ScrollToTop";
import { HeroCarousel } from "../../components/HeroCarousel";
import useScreenSize from "../../hooks/useScreenSize";
import useMultipleUrls from "../../hooks/useMultipleUrls";
import { Error } from "../../components/Error";
import { urlsForHomePage as urls } from "../../statics/urls";
import { MainSlider } from "../../components/MainSlider";
import { Title } from "../../components/Title";
import { Heading } from "../../components/Heading/Heading";

function Home() {
  const windowWidth = useScreenSize();
  const { data, error, isLoading } = useMultipleUrls(urls);
  if (isLoading) return console.log(isLoading);
  if (error) return <Error />;

  const [
    { results: popularMovies },
    { results: trendingMovies },
    { results: upcomingMovies },
    { results: nowPlayingMovies },
    { results: topRatedTvs },
    { results: airingTodayTvs },
    { results: popularTvs },
    { results: trendingPeople },
  ] = data;

  const moviesArr = [
    { popularMovies: popularMovies },
    { trendingMovies: trendingMovies },
    { upcomingMovies: upcomingMovies },
  ];
  const tvsArr = [topRatedTvs, airingTodayTvs, popularTvs];

  return (
    <>
      <ScrollToTop />

      <div className={styles.container}>
        <div className={styles.hero_wrapper}>
          <HeroCarousel windowWidth={windowWidth} movies={nowPlayingMovies.slice(0, 6)} />
        </div>

        <div className={styles.inner_main}>
          <Title des="Picked up Popular movies for you">Popular Movies</Title>
          <MainSlider windowWidth={windowWidth} movies={popularMovies} horizontal={false} />
          <Title des="Now in Trend">Trending Movies</Title>
          <MainSlider windowWidth={windowWidth} movies={trendingMovies} horizontal={false} />
          <Title des="Top Rated by our users">Top Rated TV shows</Title>
          <MainSlider windowWidth={windowWidth} movies={topRatedTvs} />
          <Heading>Explore upcoming movies</Heading>
          <Title des="Discover new movies">UP coming Movies</Title>
          <MainSlider windowWidth={windowWidth} movies={upcomingMovies} horizontal={false} />
          <Title>Airing Today's TVs</Title>
          <MainSlider windowWidth={windowWidth} movies={airingTodayTvs} />
          <Title>People</Title>
          <MainSlider windowWidth={windowWidth} movies={trendingPeople} starCard={true} />
        </div>
      </div>
    </>
  );
}

export default Home;
