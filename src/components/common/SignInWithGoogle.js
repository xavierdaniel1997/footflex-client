import {useGoogleLogin} from "@react-oauth/google";
import React from "react";
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import api from "../../config/axiosConfig";
import {setUser} from "../../redux/authSlice";
import toast from "react-hot-toast";

const SignInWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await api.post(
          "/users/google-login",
          {
            code: codeResponse.code,
          },
          {withCredentials: true}
        );
        dispatch(setUser(res.data.userData));
        toast.success(res.data.message);
        navigate(res.data.userData.role ? "/dashboard" : "/");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Google login failed");
      }
    },
    flow: "auth-code",
  });
  return (
    <div>
      <button
        onClick={() => login()}
        type="button"
        className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FcGoogle className="w-5 h-5 mr-2" />
        Sign up with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
