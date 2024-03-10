import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../service/productService";

export const searchContext = createContext();

export function SearchContextProvider({ children }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [productToShow, setProductToShow] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API REQUEST TO RECEIVE ALL CARDS WHEN PAGE UP
    async function fetchData() {
      setProducts(await productService.getAllProducts());
    }
    fetchData();
  }, []);
  // FILTERING THE CARDS TO SHOW THE RESULT AND DIRECTING FOR THE RIGHT PAGE
  const handleClick = () => {
    if (!products) {
      return null;
    }

    setProductToShow(
      products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      )
    );
    navigate("/search-results");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <searchContext.Provider
      value={{
        search,
        products,
        productToShow,
        handleClick,
        handleChange,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}

export const useSearch = () => useContext(searchContext);
