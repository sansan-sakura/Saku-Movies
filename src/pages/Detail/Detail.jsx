import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Detail.module.scss";
import { LoadingFullPage } from "../../components/LoaingFullPage";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Error } from "../../components/Error";
import useFetchData from "../../hooks/useFetchData";
import { Title } from "../../components/Title";
import { PlayButton } from "../../components/PlayButton";
import useFetchMovie from "../../hooks/useFetchMovie";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toggleVisible, setToggleVisible] = useState(false);
  const { startVideo, setTriggerMovie, setStartVideo } = useFetchMovie(id);
  const { data, error, isLoading } = useFetchData({ path: `movie/${id}`, id: `movie/${id}` });

  useEffect(() => {
    if (!data || !data.title) return;
    document.title = `Movie | ${data.title}`;
    return function () {
      document.title = " SaKu MOVIES";
    };
  }, [data]);

  if (isLoading) return <p>Loading</p>;

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
      {!isLoading ? (
        !error ? (
          <section className={styles.detail_wrapper}>
            <div className={styles.container}>
              <div className={styles.upper_details_box}>
                <a onClick={() => navigate(-1)}>&#x3c; BACK</a>
                <div className={styles.upper_details_box_innerbox}>
                  <h1>{title}</h1>
                  <p>{tagline}</p>
                  <div>
                    <p>Release Date: {release_date}</p>
                    <p>Status: {status}</p>
                    <span>{runtime} min</span>
                  </div>
                </div>
              </div>
              <div className={styles.hero}>
                <img
                  className={styles.hero_poster_img}
                  src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                  alt={title}
                />
                <div className={styles.hero_img_video_box}>
                  <img
                    className={styles.hero_bd_img}
                    src={
                      backdrop_path
                        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                        : `https://image.tmdb.org/t/p/original${poster_path}`
                    }
                    style={{
                      display: !startVideo.start ? "flex" : "none",
                    }}
                  />
                  <PlayButton
                    key={id}
                    handleClick={() => setTriggerMovie((prev) => ({ ...prev, trigger: true }))}
                  />

                  {startVideo.start && (
                    <div
                      className={styles.hero_video_box}
                      style={{ display: startVideo.start ? "block" : "none" }}
                    >
                      <iframe
                        style={{ height: "600px", width: "600px" }}
                        className={styles.video}
                        id="player"
                        src={`${startVideo.url}`}
                      ></iframe>
                      <PlayButton
                        key={id}
                        handleClick={() => setStartVideo((prev) => ({ ...prev, start: false }))}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.main}>
                <div className={styles.main_inner}>
                  <div className={styles.main_genre}>
                    {genres.length > 0 &&
                      genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
                  </div>
                  <div className={styles.main_text}>
                    <p>{overview}</p>
                  </div>

                  <div className={styles.main_rating}>
                    <span>⭐️ {vote_average.toFixed(1)} / 10</span>
                    <span>Populality : {popularity.toFixed(1)}</span>
                  </div>
                  <div>
                    <button onClick={() => setToggleVisible((pre) => !pre)}>More Details</button>
                    <a href={homepage}>Check Site</a>
                  </div>
                  <div
                    className={styles.main_details}
                    style={{ display: toggleVisible ? "grid" : "none" }}
                  >
                    <div>
                      {budget > 0 && <p>budget: {budget}</p>}
                      <span>imdb ID : {imdb_id}</span>
                      <p>Original language : {original_language}</p>
                    </div>
                    <p>
                      Production Country :
                      {production_countries.map((con) => (
                        <span key={con.id}> {con.name}</span>
                      ))}
                    </p>
                    <div>
                      <h6>Production Company :</h6>
                      {production_companies.map((comp) => (
                        <p key={comp.id}>{comp.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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
        ) : (
          <Error message={error} />
        )
      ) : (
        <LoadingFullPage />
      )}
    </>
  );
}

export default Detail;
