import axios from "axios";

const api = axios.create({
    baseURL: `https://api.footflexonline.shop/api`,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})
  

export default api;






 









// import axios from "axios";
// import { logoutUser } from "../../redux/slices/authSlice";
// import store from "../../redux/store/store";

// const api = axios.create({
// 	baseURL: "http://localhost:5000/api",
// 	withCredentials: true,
// });

// api.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response && error.response.status === 401) {
// 			store.dispatch(logoutUser());
// 			window.location.href = "/login";
// 		}
// 		return Promise.reject(error);
// 	}
// );

