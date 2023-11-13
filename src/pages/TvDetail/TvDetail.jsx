import styles from "./TvDetail.module.scss";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { ScrollToTop } from "../../components/ScrollToTop";
import { LoadingFullPage } from "../../components/LoaingFullPage";
import { DetailTemp } from "../../components/DetailTemp/DetailTemp";
import { Error } from "../../components/Error";
import { StarCard } from "../../components/StarCard/StarCard";
export const TvDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchData({ path: `tv/${id}`, id: `tvs/${id}` });

  if (isLoading) return <LoadingFullPage />;
  if (error) return <Error />;
  const {
    backdrop_path,
    poster_path,
    genres,
    homepage,
    original_language,
    overview,
    popularity,
    production_companies,
    production_countries,
    episode_run_time,
    vote_average,
    name,
    first_air_date,
    status,
    tagline,
    in_production,
    created_by,
  } = data;

  return (
    <>
      <ScrollToTop />
      <section className={styles.detail_wrapper}>
        <div className={styles.container}>
          <DetailTemp
            backdrop_path={backdrop_path}
            poster_path={poster_path}
            genres={genres}
            homepage={homepage}
            original_language={original_language}
            overview={overview}
            popularity={popularity}
            production_companies={production_companies}
            production_countries={production_countries}
            runtime={episode_run_time}
            vote_average={vote_average}
            title={name}
            release_date={first_air_date}
            status={status}
            tagline={tagline}
            id={id}
            inProduction={in_production}
            movie={false}
          />
          <div className={styles.people_box}>
            {created_by.map((auth) => (
              <StarCard movie={auth} key={auth.id} isCollection={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
