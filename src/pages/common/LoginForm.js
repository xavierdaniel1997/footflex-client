import React, { useState } from "react";
import {FcGoogle} from "react-icons/fc";
import LoginRegisterLeftImg from "../../components/common/LoginRegisterLeftImg";
import SignInWithGoogle from "../../components/common/SignInWithGoogle";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/validateForms";
import { toast, Toaster } from 'react-hot-toast';
import api from "../../config/axiosConfig";

const LoginForm = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("from login page", formData)
    const validateForm = validateLoginForm(formData)
    setErrors(validateForm)
    if(Object.keys(validateForm).length===0){
      try{
        const response = await api.post("users/login", formData)
        console.log("this is the response form login ", response)
        toast.success(response.data.message)
        if(response.status===200){
          setTimeout(()=>{
            navigate("/")
          },500)
        }
      }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <LoginRegisterLeftImg />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">LOG-IN TO GET START</h2>
      
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
            {errors.email && (
                <p className="text-red-500 text-sm px-2">{errors.email}</p>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleOnchange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
            P@ssw0rd!
              {errors.password && (
                <p className="text-red-500 text-sm px-2">{errors.password}</p>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleOnchange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              LOGIN
            </button>
            <SignInWithGoogle/>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
