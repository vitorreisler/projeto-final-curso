import axios from "axios";


const TOKEN_KEY = "token";
const API_BASE = "http://localhost:8080";


export async function createUser(user) {
  const response = await axios.post(`${API_BASE}/api/users`, user);
  return response;
}

export async function login(credentials) {
  const { data } = await axios.post(
    "http://localhost:8080/api/users/login",
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  localStorage.setItem(TOKEN_KEY, data.token);
  
}

export async function deleteUser(id) {
  const response = await axios.delete(`${API_BASE}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem(TOKEN_KEY),
    },
  });
  return response;
}

export async function getAllUsers() {
  const response = await axios.get(`${API_BASE}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem(TOKEN_KEY),
    },
  });
  return response;
}

export async function getUserById(id) {
  return await axios.get(`${API_BASE}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem(TOKEN_KEY),
    },
  });
}
export async function editUser(id, values) {
  const response = await axios.put(`${API_BASE}/api/users/${id}`, values, {
    headers: { "Content-Type": "application/json", "x-auth-token": localStorage.getItem(TOKEN_KEY) },
  });
  return response.data;
}

export async function patchUserAdminStatus(id) {
  const res = await axios.patch(
    `${API_BASE}/api/users/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem(TOKEN_KEY),
      },
    }
  );
  return res;
}

const userService = {
  createUser,
  login,
  deleteUser,
  getAllUsers,
  getUserById,
  editUser,
  patchUserAdminStatus,
};

export default userService;
