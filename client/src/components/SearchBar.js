import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("searches");
    if (query) {
      setSearchTerm(query);
    }
  }, [location]);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const params = new URLSearchParams(location.search);
    params.set("search", newSearchTerm);
    navigate({ search: params.toString() });
  };

  return (
    <>
      <FormControl
        className="search-bar"
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchBar;
