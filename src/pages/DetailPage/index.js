import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "../../api/axios";
import makeImagePath from "../../utils/makeImagePath";
import "./DetailPage.css";

export default function DetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const isMovie = JSON.parse(query.get("movie"));

  const fetchData = async () => {
    let request = null;
    if (isMovie) {
      //영화정보불러오기
      request = await axios.get(`movie/${id}`, {
        params: {
          append_to_response: "videos",
        },
      });
    } else {
      //티비정보불러오기.
      request = await axios.get(`tv/${id}`, {
        params: {
          append_to_response: "videos",
        },
      });
    }
    console.log(request.data);
    setDetail(request.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (detail) {
    return (
      <section className="detail_container">
        <img
          className="detail_poster"
          src={makeImagePath(detail.backdrop_path || detail.poster_path)}
        />
        <div className="detail_content">
          <h3 className="detail_title">
            {detail.title || detail.name}{" "}
            <span className="datail_date">
              {detail.release_date
                ? detail.release_date
                : detail.first_air_date}
            </span>
          </h3>
          <p className="detail_category">
            카테고리 :{detail.genres[0] && detail.genres[0].name}
          </p>
          <p className="detail_vote_average">⭐평점 : {detail.vote_average}</p>
          <p className="detail_vote_count">투표수 : {detail.vote_count}</p>
          <p className="detail_overview">{detail.overview}</p>
          <div className="detail_video_keys">
            {detail?.videos?.results?.map((video, index) => {
              return (
                <p className="detail_video_key">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                  >{`https://www.youtube.com/watch?v=${video.key}`}</a>
                </p>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    return <div>...Loading...</div>;
  }
}
