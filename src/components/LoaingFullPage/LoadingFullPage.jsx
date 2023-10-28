import styles from "./LoadingFullPage.module.scss";
import { Loading } from "../Loading";

function LoadingFullPage() {
  return (
    <div className={styles.loading_page}>
      <Loading />
    </div>
  );
}

export default LoadingFullPage;
