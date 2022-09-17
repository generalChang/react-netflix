import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import makeImagePath from "../../utils/makeImagePath";
import "./MovieModal.css";
export default function MovieModal({
  id,
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  poster_path,
  setModalOpen,
  original_title,
  original_name,
}) {
  const navigate = useNavigate();
  const ref = useRef();
  const [isMovie, setIsMovie] = useState(true);

  useEffect(() => {
    if (original_name) {
      setIsMovie(false);
    }
  }, []);

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });
  return (
    <div className="presentation">
      <div className="wrapper_modal">
        <div className="modal" ref={ref}>
          <span className="modal_close" onClick={() => setModalOpen(false)}>
            x
          </span>
          <img
            className="modal_poster_img"
            src={makeImagePath(backdrop_path || poster_path)}
            alt="modal_poster_img"
          />

          <div className="modal_content">
            <p className="modal_details">
              <span className="modal_user_perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal_title">{title ? title : name}</h2>
            <p className="modal_overview">평점 : {vote_average}</p>
            <p className="modal_overview">{overview}</p>
            <button
              className="modal_detail_button"
              onClick={() => navigate(`/${id}?movie=${isMovie}`)}
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
