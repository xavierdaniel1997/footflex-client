import React, {useState} from "react";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import {
  TextField,
} from "@mui/material";
import {FaCalendarAlt} from "react-icons/fa";
import {FiChevronDown, FiDownload, FiFilter, FiPrinter} from "react-icons/fi";
 
const SalesReportPage = () => {
  const location = useLocation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filter, setFilter] = useState("Daily");

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        noButton={false}
        componentLocation={"Sales Report"}
        location={location.pathname}
      />
      <div className="px-10">

        <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          
        <button className="flex items-center justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
            <FiFilter className="text-blue-600 mr-1" />
            <select name="" value={filter} className="outline-none" onChange={handleFilterChange}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </button>

          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <TextField
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "4px", 
              }}
            />
          </div>
       
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <TextField
              label="To"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "4px", 
              }}
            />
          </div>

          <button className="bg-black text-white font-semibold px-3 py-2 border-none rounded-md">Submit</button>

        </div>

        <div className="flex space-x-4">
      <button className="flex items-center justify-center w-14 h-10 bg-black rounded-md">
        <FiDownload className="text-white text-2xl" />
      </button>
      <button className="flex items-center justify-center w-14 h-10 bg-black rounded-md">
        <FiPrinter className="text-white text-2xl" />
      </button>
    </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportPage;
