import { useNavigate, useParams } from "react-router-dom";
import { useRef, useCallback, useState, useEffect } from "react";
import styles from "./StarDetail.module.scss";
import useFetchData from "../../hooks/useFetchData";
import { ReadMore } from "../../components/ReadMore";
import { useMovie } from "../../context/MovieContext";
import { MovieSmallCard } from "../../components/MovieSmallCard";
import { SmallSlider } from "../../components/SmallSlider/SmallSlider";
export const StarDetail = () => {
  const navigate = useNavigate();
  const { starId } = useParams();
  const imageRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  const getWidth = useCallback(() => {
    if (!imageRef.current) return;
    setItemWidth(imageRef.current.offsetWidth);
  }, [imageRef]);

  const { data, error, isLoading } = useFetchData({
    path: `person/${starId}?language=en-US`,
    id: `star/${starId}`,
  });

  const { data: imageData, isLoading: imageIsLoading } = useFetchData({
    path: `person/${starId}/images`,
    id: `star/images/${starId}`,
  });
  useEffect(() => {
    getWidth();
  }, [imageRef, getWidth, imageData]);
  const { trendingPeople } = useMovie();

  if (isLoading || imageIsLoading) return <p>Loading</p>;
  if (error) return <p>error</p>;
  if (data?.success === false) return <p>error</p>;

  const { known_for_department, name, biography, place_of_birth, homepage, birthday, deathday } =
    data;

  const { profiles } = imageData;

  const target = trendingPeople && data && trendingPeople.filter((obj) => obj.name === data.name);
  const [{ known_for }] = target && data && target;

  return (
    <div className={styles.star_detail}>
      <div className={styles.star_detail_inner}>
        <a onClick={() => navigate(-1)}>&#x3c; BACK</a>
        <div className={styles.star_detail_inner_upper}>
          <div>
            <h1>{name}</h1>
            <p>
              <span>Birth Day</span>
              <span>{birthday}</span>
            </p>
            {deathday && (
              <p>
                <span>Death Day</span>
                <span>{deathday}</span>
              </p>
            )}
            <p>
              <span>Place of Birth</span>
              <span>{place_of_birth}</span>
            </p>
            <p>
              <span>Know for</span>
              <span>{known_for_department}</span>
            </p>
          </div>
          <SmallSlider images={profiles} itemRef={imageRef} totalWidth={itemWidth} />
        </div>
      </div>
      <div className={styles.star_detail_inner_under}>
        <div className={styles.movies_box}>
          {data && known_for.map((movie) => <MovieSmallCard movie={movie} key={movie.id} />)}
        </div>
        <p>{biography}</p>

        {homepage && <ReadMore path={homepage}> Check Home Page</ReadMore>}
      </div>
    </div>
  );
};
