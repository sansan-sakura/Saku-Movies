import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Detail.module.scss";
import { LoadingFullPage } from "../../components/LoaingFullPage";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Error } from "../../components/Error";
import useFetchData from "../../hooks/useFetchData";
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading/Heading";
import { Title } from "../../components/Title";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedMovie, setSelectedMovie] = useState(id);

  const [triggerMovie, setTriggerMovie] = useState({ trigger: false, id: null });
  const [startVideo, setStartVideo] = useState({ start: false, url: "" });

  const { data, error, isLoading } = useFetchData(`movie/${id}`);
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

  // const { data, isImageLoading } = useSWR(
  //   triggerMovie.trigger ? `${triggerMovie.id}/videos?language=en-US` : null,
  //   fetcher
  // );

  // useEffect(() => {
  //   if (!isImageLoading) setTriggerMovie(false);
  //   if (data) {
  //     const youtube = data.results.map((obj) => Object.values(obj).includes("YouTube"));
  //     youtube &&
  //       data.results.length > 0 &&
  //       setStartVideo({
  //         start: true,
  //         url: ` https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${data.results[0].key}`,
  //       });
  //   }
  // }, [isImageLoading, data]);

  // useEffect(() => {
  //   if (!selectedMovie || !selectedMovie.title) return;
  //   document.title = `Movie | ${selectedMovie.title}`;
  //   return function () {
  //     document.title = " S x S MOVIES";
  //   };
  // }, [selectedMovie]);

  return (
    <>
      <ScrollToTop />
      {!isLoading ? (
        !error ? (
          selectedMovie ? (
            <section className={styles.detail_wrapper}>
              <div className={styles.container}>
                <div className={styles.upper_details_box}>
                  <a onClick={() => navigate(-1)}>
                    <p className={styles.button}> &#x3c; BACK</p>
                  </a>
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
                  <div
                    onMouseEnter={() => setTriggerMovie({ trigger: true, id: id })}
                    className={styles.hero_bd_img}
                    style={{
                      backgroundImage: backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
                        : `url(https://image.tmdb.org/t/p/original${poster_path})`,
                      display: !startVideo.start ? "flex" : "none",
                    }}
                  ></div>
                  {/* {startVideo.start && (
                  <div className={styles.video_box}>
                    <iframe className={styles.video} id="player" src={`${startVideo.url}`}></iframe>
                  </div>
                )} */}
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
                    <a href={homepage}>Check more</a>
                    <div className={styles.main_details}>
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
            // </div>
            <p>No movie details available</p>
          )
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
