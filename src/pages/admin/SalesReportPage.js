import React, {useEffect, useState} from "react";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import {TextField} from "@mui/material";
import {FaCalendarAlt} from "react-icons/fa";
import {FiChevronDown, FiDownload, FiFilter, FiPrinter} from "react-icons/fi";
import { FaRegFileExcel } from "react-icons/fa6";
import dayjs from "dayjs";
import api from "../../config/axiosConfig";
import SalesReportTable from "../../components/admin/SalesReportTable";

const SalesReportPage = () => {
  const location = useLocation();
  // const [fromDate, setFromDate] = useState(dayjs().startOf("day").format("YYYY-MM-DD"));
  // const [toDate, setToDate] = useState(dayjs().endOf("day").format("YYYY-MM-DD"));
  // const [filter, setFilter] = useState("Daily");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState("Daily");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchReport(selectedFilter);
  };

  const fetchReport = async (
    selectedFilter = null,
    start = null,
    end = null
  ) => {
    try {
      let params = {};
      if (selectedFilter) {
        params.filter = selectedFilter;
      } else if (start && end) {
        params.fromDate = start;
        params.toDate = end;
      } else {
        params.filter = "Daily";
      }

      const response = await api.get("salesAndDetials/sales-report", {params});
      setReportData(response?.data?.report);
      console.log("this is the response of fetch sales report ", response);
    } catch (error) {
      console.log("Error fetching sales report:", error);
      setError("Failed to fetch sales report. Please try again.");
    }
  };

  const handleCustomDateSubmit = () => {
    if (fromDate && toDate) {
      console.log("this is frm the finding sales by date", fromDate, toDate);
      fetchReport(null, fromDate, toDate);
    } else {
      setError("Please select both start and end dates.");
    }
  };

  useEffect(() => {
    fetchReport("Daily");
  }, []);


  // console.log("this is form the sale reprt page ", reportData);

 
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
              <select
                name=""
                value={filter}
                className="outline-none"
                onChange={handleFilterChange}
              >
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
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
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
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
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

            <button
              className="bg-black text-white font-semibold px-3 py-2 border-none rounded-md"
              onClick={handleCustomDateSubmit}
            >
              Submit
            </button>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center justify-center w-14 h-10 bg-black rounded-md">
              <FiDownload className="text-white text-2xl" />
            </button>
            <button className="flex items-center justify-center w-14 h-10 bg-black rounded-md">
              <FaRegFileExcel className="text-white text-2xl" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <SalesReportTable reportData={reportData}/>
        </div>
      </div>
    </div>
  );
};

export default SalesReportPage;
