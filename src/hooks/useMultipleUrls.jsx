import useSWR from "swr";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY, // eslint-disable-line
  },
};

const fetcher = async (paths) => {
  const data = await Promise.all(
    paths.map(async (path) => {
      const data = await fetch(`https://api.themoviedb.org/3/${path}`, options).then((response) =>
        response.json()
      );
      return data;
    })
  );
  return data;
};

function useMultipleUrls(paths) {
  const { data, error, isLoading } = useSWR("getMultipleData", () => fetcher(paths));

  return { data, isLoading, error };
}

export default useMultipleUrls;
