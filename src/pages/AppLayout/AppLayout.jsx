import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { HeroCarouselProvider } from "../../context/HeroCarouselContext";

function AppLayout() {
  return (
    <HeroCarouselProvider>
      <div className={styles.main_wrapper}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </HeroCarouselProvider>
  );
}

export default AppLayout;
