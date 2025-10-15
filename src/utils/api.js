import axios from "axios";

const api = axios.create({
  baseURL: "http://10.5.5.1",   // 공통 IP 주소
  // withCredentials: true              // 세션/쿠키 필요하다면
});

// api.interceptors.request.use(
//     (config) => {
//         const token = sessionStorage.getItem("token")
//         if(token){
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     }
// )


export default api;