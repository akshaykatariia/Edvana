import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const OnSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={OnSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex item-center bg-white border border-gray-500/20 rounded"
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
        style={{ marginTop: "13px", height: "25px" }}
      />
      <input
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <button
        type="submit"
        className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 mr-1 mt-1 md:h-[46px] h-[37px]"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
