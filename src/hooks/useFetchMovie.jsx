import useFetchData from "./useFetchData";
import { useEffect, useState } from "react";

const useFetchMovie = (id) => {
  const [startVideo, setStartVideo] = useState({ start: false, url: "" });
  const [triggerMovie, setTriggerMovie] = useState({ trigger: false, id: null });
  const {
    data: videoData,
    isLoading: isVideoLoading,
    error: videoError,
  } = useFetchData({
    path: triggerMovie.trigger ? `movie/${id}/videos?language=en-US` : null,
    id: `video/${id}`,
  });

  useEffect(() => {
    if (!isVideoLoading) setTriggerMovie(false);
    if (videoData && !videoError) {
      const youtube = videoData.results.map((obj) => Object.values(obj).includes("YouTube"));

      youtube &&
        videoData.results.length > 0 &&
        setStartVideo({
          start: true,
          url: ` https://www.youtube.com/embed/${videoData.results[0].key}?autoplay=1&mute=1&loop=1&playlist=${videoData.results[0].key}`,
        });
    }
  }, [isVideoLoading, videoData, videoError]);
  return { startVideo, setStartVideo, setTriggerMovie };
};
export default useFetchMovie;
