import React from 'react'
import {FcGoogle} from "react-icons/fc";

const SignInWithGoogle = () => {
  return (
    <div>
        <button
              type="button"
              className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
    </div>
  )
}

export default SignInWithGoogle