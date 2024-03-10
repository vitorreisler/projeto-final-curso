import { useSearch } from "../context/search.context";
import Product from "./commons/product";

const SearchResult = () => {
  const { productToShow, search } = useSearch();
  if (!productToShow) {
    return null;
  }
  if (productToShow.length === 0) {
    return (
      <div className="text-center display-5 my-5">
      <p >
        Sorry, but we couldn't find a product with the title: "{search}"{" "}
      </p>
      <span className="display-6">for a new search, please press Enter</span>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center gap-2 flex-wrap my-3">
      {productToShow &&
        productToShow.map((product) => (
          <div
            key={product.productId}
            className={`${product.available !== -1 ? "" : "dontHaveProduct"}`}
          >
            <Product
              key={product.productId}
              productName={product.productName}
              productDescription={product.productDescription}
              productPrice={product.productPrice}
              productSize={product.productSize}
              productImg={product.productImage.url}
              productAlt={product.productImage.alt}
              productId={product.productId}
              category={product.category}
              available={product.available}
            />
          </div>
        ))}
    </div>
  );
};

export default SearchResult;
