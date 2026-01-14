const ShoeCardShimmer = ({ inUserProfile }) => {
    return (
      <div className="max-sm:mt-5">
        <div
          className={`${
            inUserProfile
              ? "bg-gray-100 p-3 rounded-md"
              : "lg:w-auto p-8 bg-gray-100 rounded-md md:w-60 max-sm:w-44"
          }`}
        >
          <div className="flex justify-end">
            <div className="bg-white p-2 text-xl rounded-full w-8 h-8 animate-pulse"></div>
          </div>
  
          <div className="flex justify-center items-center h-32 md:h-40 lg:h-48 rounded-md animate-pulse"></div>
        </div>
  
        <div className="p-2 flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
            <div className="flex gap-3 items-center">
              <div className="h-4 bg-gray-200 rounded-md w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse"></div>
            </div>
          </div>
  
          <div className="text-gray-600 font-medium">
            <div className="h-4 bg-gray-200 rounded-md w-8 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShoeCardShimmer;
  