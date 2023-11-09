import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { HeroCarouselProvider } from "../../context/HeroCarouselContext";
import { GenreProvider } from "../../context/GenreContext";
import { MovieProvider } from "../../context/MovieContext";
import { SearchMovieProvider } from "../../context/SearchMovieContext";

function AppLayout() {
  return (
    <MovieProvider>
      <HeroCarouselProvider>
        <GenreProvider>
          <SearchMovieProvider>
            <div className={styles.main_wrapper}>
              <Header />
              <main className={styles.main}>
                <Outlet />
              </main>
              <Footer />
            </div>
          </SearchMovieProvider>
        </GenreProvider>
      </HeroCarouselProvider>
    </MovieProvider>
  );
}

export default AppLayout;
