import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    //component가 unmount될떄.
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchValue(value);
    navigate(`/search?q=${value}`);
  };
  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        className="nav_logo"
        onClick={() => window.location.replace("/")}
      />

      <input
        className="nav_input"
        value={searchValue}
        type="text"
        onChange={handleChange}
        placeholder="영화를 검색해주세요"
      />
      <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        className={`nav_avatar ${show && "nav_avatar_white"}`}
      />
    </nav>
  );
}
