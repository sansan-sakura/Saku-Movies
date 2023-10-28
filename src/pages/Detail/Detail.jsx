import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import styles from "./Detail.module.css";
import { LoadingFullPage } from "../../components/LoaingFullPage";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Error } from "../../components/Error";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",

    Authorization: import.meta.env.VITE_API_KEY, // eslint-disable-line
  },
};

const fetcher = async (path) => {
  const data = await fetch(`https://api.themoviedb.org/3/movie/${path}`, options).then((response) =>
    response.json()
  );

  return data;
};

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  const backdropPath = new URLSearchParams(location.search).get("backdrop_path");
  const posterPath = new URLSearchParams(location.search).get("poster_path");
  const selectedMovieId = new URLSearchParams(location.search).get("movie_id");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [triggerMovie, setTriggerMovie] = useState({ trigger: false, id: null });
  const [startVideo, setStartVideo] = useState({ start: false, url: "" });

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovieId}?language=en-US`,
          options
        );
        if (response.status === 200) {
          const data = await response.json();

          setSelectedMovie(data);
        } else if (response.status === 401) {
          setError("Unauthorized: Please check your API key and permissions.");
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data.");
        setIsLoading(false);
      }
    }

    if (selectedMovieId) {
      fetchMovieDetails();
    }
  }, [selectedMovieId]);

  const { data, isImageLoading } = useSWR(
    triggerMovie.trigger ? `${triggerMovie.id}/videos?language=en-US` : null,
    fetcher
  );

  useEffect(() => {
    if (!isImageLoading) setTriggerMovie(false);
    if (data) {
      const youtube = data.results.map((obj) => Object.values(obj).includes("YouTube"));
      youtube &&
        data.results.length > 0 &&
        setStartVideo({
          start: true,
          url: ` https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${data.results[0].key}`,
        });
    }
  }, [isImageLoading, data]);

  useEffect(() => {
    if (!selectedMovie || !selectedMovie.title) return;
    document.title = `Movie | ${selectedMovie.title}`;
    return function () {
      document.title = " S x S MOVIES";
    };
  }, [selectedMovie]);

  return (
    <React.Fragment>
      <ScrollToTop />
      <Navbar />
      {!isLoading ? (
        !error ? (
          selectedMovie ? (
            // <div>
            //   <div>
            //     <h1>{selectedMovie.title}</h1>
            //     {backdropPath ? ( // Check if backdropPath is not null
            //       <img
            //         src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
            //         alt={selectedMovie.title}
            //       />
            //     ) : (
            //       <p>No backdrop image available</p>
            //     )}
            //     <p>{selectedMovie.overview}</p>
            //     <p>Release Date: {selectedMovie.release_date}</p>
            //   </div>

            <section className={styles.detail_wrapper}>
              <div className={styles.detail}>
                <div
                  onMouseEnter={() => setTriggerMovie({ trigger: true, id: selectedMovie.id })}
                  className={styles.detail_img}
                  style={{
                    backgroundImage: selectedMovie.backdrop_path
                      ? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
                      : `url(https://image.tmdb.org/t/p/original${posterPath})`,
                    display: !startVideo.start ? "flex" : "none",
                  }}
                >
                  <div className={styles.deco_box}></div>
                  <div className={styles.deco_box}></div>
                </div>
                {startVideo.start && (
                  <div className={styles.video_box}>
                    <iframe className={styles.video} id="player" src={`${startVideo.url}`}></iframe>
                  </div>
                )}
              </div>
              <div className={styles.main_wrapper}>
                <a onClick={() => navigate(-1)}>
                  <p className={styles.button}> &#x3c; BACK</p>
                </a>

                <div className={styles.top_detail_box}>
                  <h1>{selectedMovie.title}</h1>
                  <p>{selectedMovie.tagline}</p>
                </div>
                <div className={styles.details_box}>
                  <div className={styles.image_box}>
                    <img
                      className={styles.poster_img}
                      src={`https://image.tmdb.org/t/p/w780${posterPath}`}
                      alt={selectedMovie.title}
                    />
                    <p>Release Date: {selectedMovie.release_date}</p>
                    <div className={styles.genre_box}>
                      {selectedMovie.genres.length > 0 &&
                        selectedMovie.genres.map((genre) => (
                          <span key={genre.id}>{genre.name}</span>
                        ))}
                    </div>
                  </div>
                  <div className={styles.text_box}>
                    <p>{selectedMovie.overview}</p>
                  </div>
                </div>
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
      <Footer />
    </React.Fragment>
  );
}

export default Detail;
