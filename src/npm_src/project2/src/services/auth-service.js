import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = 'http://127.0.0.1:8080/api/';

const register = async (data={}) => {
  try {
    const response = await axios.post("auth/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
        if (!AuthService.isJwtValid()){
            AuthService.logout();
            window.location.replace('/index.html?page=login&logout=true&expired=true')
        }
    }
    throw error.response.data;
  }
};

const login = (username, password) => {
    return axios.post("auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isJwtValid = () => {
    let token = localStorage.getItem("user");
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {  
      return true;
    }
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isJwtValid
};

export default AuthService;