import { createContext, useContext, useReducer } from "react";

const MovieContext = createContext();

const initialState = {
  movie: "",
};

function reducer(state, action) {
  console.log(action, state);
}

function MovieProvider({ children }) {
  const [{ movie }, dispatch] = useReducer(reducer, initialState);

  return <MovieContext.Provider value={{ movie }}>{children}</MovieContext.Provider>;
}

function useMovie() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("MovieContext was used outside the MovieProvider");
  }

  return context;
}

export { MovieProvider, useMovie };
