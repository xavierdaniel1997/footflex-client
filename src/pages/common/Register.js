import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      {/* <Link to="/">
        <span className="m-10 text-green-600 cursor-pointer">/ Home</span>
      </Link> */}
      <div className="flex justify-center items-center min-h-screen p-4 md:p-0">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col gap-8 p-6 md:p-10 shadow-2xl border-2 rounded-lg">
          <div className="flex flex-col gap-3 justify-center items-center">
            <span className="font-bold text-xl md:text-2xl text-green-600 text-center">
              WELCOME TO THE FOOTFLEX
            </span>
            <p className="font-semibold text-lg md:text-xl text-center">
              LOG-IN TO GET STARTED
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="flex gap-4 md:gap-5">
              <input
                type="text"
                placeholder="Enter Your First Name"
                className="text-md md:text-lg text-gray-500 w-1/2 outline-none border-2 p-2 md:p-3 rounded-md"
              />
              <input
                type="text"
                placeholder="Enter Your Last Name"
                className="text-md md:text-lg text-gray-500 w-1/2 outline-none border-2 p-2 md:p-3 rounded-md"
              />
            </div>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="text-md md:text-lg text-gray-500 w-full outline-none border-2 p-2 md:p-3 rounded-md"
            />
            <input
              type="text"
              placeholder="Enter Your Phone"
              className="text-md md:text-lg text-gray-500 w-full outline-none border-2 p-2 md:p-3 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              className="text-md md:text-lg text-gray-500 w-full outline-none border-2 p-2 md:p-3 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Your Password"
              className="text-md md:text-lg text-gray-500 w-full outline-none border-2 p-2 md:p-3 rounded-md"
            />
            <div className="flex justify-between">
              <p className="cursor-pointer text-center text-sm md:text-base">
                Already have an account? Sign In
              </p>
              {/* <p className="cursor-pointer text-center text-sm md:text-base">
                Forgot password ?
              </p> */}
            </div>
            <button className="w-full bg-black p-2 md:p-3 font-semibold text-sm md:text-lg text-white rounded-md">
              REGISTER
            </button>
            {/* <button className="w-full border-2 p-2 md:p-3 font-semibold text-sm md:text-lg flex justify-center items-center gap-2 md:gap-4 rounded-md">
              <FcGoogle className="text-xl md:text-2xl" />
              Sign In with Google
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
