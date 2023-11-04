import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { HeroCarouselProvider } from "../../context/HeroCarouselContext";
import { StarDetail } from "../StarDetail";

function AppLayout() {
  return (
    <HeroCarouselProvider>
      <div className={styles.main_wrapper}>
        <Header />
        <main className={styles.main}>
          <Outlet />
          <StarDetail />
        </main>
        <Footer />
      </div>
    </HeroCarouselProvider>
  );
}

export default AppLayout;
