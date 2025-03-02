import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_KEY = "5ca89627";
const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;
const App = () => {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data); // Log the data to see the response
      setMovies(data.Search);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };
  useEffect(() => {
    searchMovie("");
  }, []);
  return (
    <div className="app">
      <h1>Movies World</h1>
      <div className="search">
        <input
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movie Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
