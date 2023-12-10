import useFetchData from "./useFetchData";
import { useEffect, useState } from "react";

const useFetchMovie = (id, movie = true) => {
  const [startVideo, setStartVideo] = useState({ start: false, url: "", error: false });
  const [triggerMovie, setTriggerMovie] = useState({ trigger: false, id: null });
  const path = `${movie ? "movie" : "tv"}/${id}/videos?language=en-US`;

  const {
    data: videoData,
    isLoading: isVideoLoading,
    error: videoError,
  } = useFetchData({
    path: triggerMovie.trigger ? path : null,
    id: `video/${movie ? "movie" : "tv"}/${id}`,
  });

  useEffect(() => {
    if (!isVideoLoading) setTriggerMovie(false);
    if (videoData && !videoError) {
      const youtube = videoData.results.map((obj) => Object.values(obj).includes("YouTube"));
      youtube &&
        videoData.results.length === 0 &&
        setStartVideo((prev) => ({ ...prev, error: true }));
      youtube &&
        videoData.results.length > 0 &&
        setStartVideo({
          error: false,
          start: true,
          url: ` https://www.youtube.com/embed/${videoData.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${videoData.results[0].key}`,
        });
    }
  }, [isVideoLoading, videoData, videoError]);
  return { startVideo, setStartVideo, setTriggerMovie, isVideoLoading };
};
export default useFetchMovie;
