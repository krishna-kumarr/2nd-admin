import axios from "axios";
import toast from "react-hot-toast";

const refreshToken = async () => {
  return "new_access_token";
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }  
});

axiosInstance.interceptors.response.use(
  (response) => {       
    if (response.data.error_code === 0) {
      if(response.data.message!=="Details fetched successfully!"){
        toast.success(response.data.message);
      }
    } else {
      toast.error(response.data.message);
    }    
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      refreshToken()
      // console.log("call the refresh token api here");
      // Handle 401 error, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  var path=window.location.pathname.split('/');

  switch(path[1]){
    case "employer_dashboard":
      let p_token = localStorage.getItem("eToken");

      if (p_token) {
        config.headers.Authorization = `Bearer ${p_token}`;
      }
      break;

    case "professional":
      let e_token = localStorage.getItem("pToken");

      if (e_token) {
        config.headers.Authorization = `Bearer ${e_token}`;
      }
      break;
  }


   

  return config;
});

export default axiosInstance;
