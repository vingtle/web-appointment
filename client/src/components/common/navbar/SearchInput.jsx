import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      const routes = {
        waxing: "/treatments/waxing",
        facial: "/treatments/advanced-skin-care",
        skin: "/treatments/advanced-skin-care",
        body: "/treatments/massages",
        massage: "/treatments/massages",
        manicure: "/treatments/manicures-pedicures",
        pedicure: "/treatments/manicures-pedicures",
        head: "/treatments/hair-scalp-care",
        hair: "/treatments/hair-scalp-care",
        eyelash: "/treatments/eyelash-extensions",
        eyebrow: "/treatments/eyelash-extensions",
      };

      const keyword = Object.keys(routes).find((key) =>
        query.toLowerCase().includes(key)
      );

      if (keyword) {
        navigate(routes[keyword]);
      } else {
        navigate("/treatments");
      }
    }
  };
  return (
    <input
      type="text"
      placeholder="Search"
      className="navbar-search-input"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
}

export default SearchInput;
