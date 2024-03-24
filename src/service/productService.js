import axios from "axios";

const token = localStorage.getItem("token");
const API_BASE = "http://localhost:8080/api/products";

export async function getAllProducts() {
  const response = await axios.get(`${API_BASE}/`);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
}

export async function getProductByCategory(category) {
  const response = await axios.get(`${API_BASE}/category/${category}`);
  return response.data;
}

export async function likeProduct(productId) {
  const response = await axios.patch(
    `${API_BASE}/${productId}`,
    {},
    { headers: { "Content-Type": "application/json", "x-auth-token": token } }
  );
  return response.data;
}

export async function createProduct(values) {
  const response = await axios.post(`${API_BASE}/`, values, {
    headers: { "Content-Type": "application/json", "x-auth-token": token },
  });
  return response.data;
}

export async function editProduct(id, values) {
  console.log(values);
  const response = await axios.put(`${API_BASE}/${id}`, values, {
    headers: { "Content-Type": "application/json", "x-auth-token": token },
  });
  return response.data;
}
export async function deleteProduct(id) {
  const response = await axios.delete(`${API_BASE}/${id}`, {
    headers: { "Content-Type": "application/json", "x-auth-token": token },
  });
  return response.data;
}

const productService = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  likeProduct,
  createProduct,
  editProduct,
  deleteProduct,
};

export default productService;
