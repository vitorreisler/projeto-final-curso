import { useSearch } from "../../context/search.context";

const SearchBar = () => {
  const { handleChange, handleClick } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="form-inline d-flex align-items-center justify-content-end my-1"
    >
      <input
        onChange={handleChange}
        className="form-control"
        type="text"
        placeholder="Search"
        style={{ position: "relative" }}
      />
      <i
        style={{ position: "absolute", color: "black", cursor: "pointer" }}
        onClick={handleClick}
        className="bi bi-search p-2"
      ></i>
    </form>
  );
};

export default SearchBar;
