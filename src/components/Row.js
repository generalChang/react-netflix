import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import makeImagePath from "../utils/makeImagePath";
import MovieModal from "./MovieModal";
import "./Row.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log(request.data.results);
  };
  useEffect(() => {
    fetchMovieData();
  }, []);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };
  return (
    <section className="row">
      <h2>{title}</h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          450: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row_poster ${isLargeRow && "row_poster_large"}`}
                src={
                  isLargeRow
                    ? makeImagePath(movie.poster_path)
                    : makeImagePath(movie.backdrop_path || movie.poster_path)
                }
                alt={movie.name || movie.title}
                onClick={() => {
                  handleClick(movie);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div className="slider">
        <div className="slider_arrow_left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                className={`row_poster ${isLargeRow && "row_poster_large"}`}
                src={
                  isLargeRow
                    ? makeImagePath(movie.poster_path)
                    : makeImagePath(movie.backdrop_path || movie.poster_path)
                }
                alt={movie.name || movie.title}
                onClick={() => handleClick(movie)}
              />
            );
          })}
        </div>

        <div className="slider_arrow_right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>

        {modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
      </div> */}
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
