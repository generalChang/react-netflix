import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  ///useLocation().search는 경로의 쿼리스트링을 얻어올 수 있음.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fetchSearchMovie = async () => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=true&query=${searchTerm}`
      );
      setSearchResults(request.data.results);
      //검색 키워드와 일치하는 Tv shows 및 movies들을 얻어온다.
    } catch (e) {
      console.error(e);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() =>
                    navigate(
                      `/${movie.id}?movie=${movie.original_title !== null}`
                    )
                  }
                  className="movie_column_poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie_img"
                    className="movie_poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results_text">
          <p>
            찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return renderSearchResults();
}
