import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Articles from "../pages/Articles";

const SearchResults = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) setSearchTerm(query);
  }, [location.search]);

  return searchTerm ? (
    <Articles category={searchTerm} searchTerm={searchTerm} />
  ) : null;
};

export default SearchResults;
