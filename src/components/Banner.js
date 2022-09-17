import axios from "../api/axios";

import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import makeImagePath from "../utils/makeImagePath";
import "./Banner.css";
import styled from "styled-components";
export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const fetchData = async () => {
    // 현재 상영중인 여러 영화 정보를 fetch하기.
    const request = await axios.get(requests.fetchNowPlaying);
    const {
      data: { results },
    } = request;
    /// results가 상영중인 영화들의 배열임.

    const movieId = results[Math.floor(Math.random() * results.length)].id;

    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    console.log(movieDetail);
    setMovie(movieDetail);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const onVideoCloseClick = () => {
    setIsClicked(false);
  };
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url(${makeImagePath(movie.backdrop_path)})`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner_content">
          <h1 className="banner_title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className="banner_buttons">
            {movie?.videos?.results?.length > 0 && (
              <button
                className="banner_button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            )}

            <button className="banner_button info">More Information</button>
          </div>

          <h1 className="banner_description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>
        <div className="banner_fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <Container>
        <CloseBtn onClick={onVideoCloseClick}>X</CloseBtn>
        <HomeContainer>
          <Iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}?controls=1&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  position: relative
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const CloseBtn = styled.button`
  position: fixed;
  background-color: transparent;
  color: white;
  top: 1.3rem;
  right: 1.3rem;
  font-size: 1.8rem;
  border: none;
  z-index: 201;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;

  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
