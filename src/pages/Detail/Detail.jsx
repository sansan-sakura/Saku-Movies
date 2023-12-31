import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import styles from "./Detail.module.scss";

import { LoadingFullPage } from "../../components/LoaingFullPage";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Error } from "../../components/Error";
import { Title } from "../../components/Title";
import { DetailTemp } from "../../components/DetailTemp/DetailTemp";

function Detail() {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchData({ path: `movie/${id}`, id: `movie/${id}` });

  if (isLoading) return <LoadingFullPage />;
  if (error) return <Error />;

  const {
    backdrop_path,
    belongs_to_collection,
    budget,
    poster_path,
    genres,
    homepage,
    imdb_id,
    original_language,
    overview,
    popularity,
    production_companies,
    production_countries,
    runtime,
    vote_average,
    title,
    release_date,
    status,
    tagline,
  } = data;

  return (
    <>
      <ScrollToTop />
      <section className={styles.detail_wrapper}>
        <div className={styles.container}>
          <DetailTemp
            backdrop_path={backdrop_path}
            budget={budget}
            poster_path={poster_path}
            genres={genres}
            homepage={homepage}
            imdb_id={imdb_id}
            original_language={original_language}
            overview={overview}
            popularity={popularity}
            production_companies={production_companies}
            production_countries={production_countries}
            runtime={runtime}
            vote_average={vote_average}
            title={title}
            release_date={release_date}
            status={status}
            tagline={tagline}
            id={id}
          />
          {belongs_to_collection && (
            <>
              <div className={styles.collection}>
                <Title>Check out the Collection</Title>
                <div className={styles.collection_img}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${belongs_to_collection.poster_path}`}
                  />
                  <p>{belongs_to_collection.name}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Detail;
