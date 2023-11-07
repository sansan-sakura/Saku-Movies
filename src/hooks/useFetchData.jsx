import useSWR from "swr";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY, // eslint-disable-line
  },
};

const fetcher = async (path) => {
  console.log(path);
  const data = await fetch(`https://api.themoviedb.org/3/${path}`, options).then((res) =>
    res.json()
  );
  console.log(data);
  return data;
};

function useFetchData(obj) {
  console.log(obj);
  const { data, error, isLoading } = useSWR(obj.path ? `getData/${obj.id}` : null, () =>
    fetcher(obj.path)
  );

  return { data, error, isLoading };
}

export default useFetchData;
