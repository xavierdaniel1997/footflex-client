// Frontend: SalesReportPage.js
import React, { useEffect, useState } from "react";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { FaCalendarAlt } from "react-icons/fa";
import { FiFilter, FiDownload, FiPrinter } from "react-icons/fi";
import dayjs from "dayjs";
import api from "../../config/axiosConfig";

const SalesReportPage = () => {
  const location = useLocation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState("Daily");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Highlight: Updated to fetch report when filter changes
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchReport(selectedFilter);
  };

  // Highlight: Updated to handle filter and custom date range separately
  const fetchReport = async (selectedFilter = null, start = null, end = null) => {
    setLoading(true);
    setError(null);
    try {
      let params = {};
      if (selectedFilter) {
        params.filter = selectedFilter;
      } else if (start && end) {
        params.fromDate = start;
        params.toDate = end;
      } else {
        // Default to current date if no filter or date range is specified
        params.filter = "Daily";
      }
      const response = await api.get("salesAndDetials/sales-report", { params });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching sales report:", error);
      setError("Failed to fetch sales report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Highlight: Updated to handle custom date range
  const handleCustomDateSubmit = () => {
    if (fromDate && toDate) {
      fetchReport(null, fromDate, toDate);
    } else {
      setError("Please select both start and end dates.");
    }
  };

  // Highlight: Fetch current date's report on component mount
  useEffect(() => {
    fetchReport("Daily");
  }, []);

  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        noButton={false}
        componentLocation={"Sales Report"}
        location={location.pathname}
      />
      <div className="px-10">
        <div className="flex items-center justify-between mb-4">
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
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

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {reportData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Summary</h3>
                <p>Total Revenue: ${reportData.summary.totalRevenue.toFixed(2)}</p>
                <p>Total Quantity: {reportData.summary.totalQuantity}</p>
                <p>Total Orders: {reportData.summary.totalOrders}</p>
                <p>Average Order Value: ${reportData.summary.averageOrderValue.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Top Products</h3>
                <ul>
                  {reportData.topProducts.map((product, index) => (
                    <li key={index}>
                      {product.productName} - ${product.totalRevenue.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Time Series Data</h3>
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Revenue</th>
                    <th>Quantity</th>
                    <th>Order Count</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.timeSeries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.period}</td>
                      <td>${entry.revenue.toFixed(2)}</td>
                      <td>{entry.quantity}</td>
                      <td>{entry.orderCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReportPage;

// Backend: generateSalesReport.js
import Order from "../models/orderModel.js";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  subWeeks,
  subMonths
} from "date-fns";

const generateSalesReport = async (req, res) => {
  try {
    const { filter, fromDate, toDate } = req.query;
    console.log("Generating sales report with params:", req.query);

    let startDate, endDate;
    const today = new Date();

    // Highlight: Separate handling for filter and custom date range
    if (fromDate && toDate) {
      startDate = new Date(fromDate);
      endDate = new Date(toDate);
    } else {
      switch (filter) {
        case "Daily":
          startDate = startOfDay(today);
          endDate = endOfDay(today);
          break;
        case "Weekly":
          startDate = startOfWeek(today);
          endDate = endOfWeek(today);
          break;
        case "Monthly":
          startDate = startOfMonth(today);
          endDate = endOfMonth(today);
          break;
        default:
          return res.status(400).json({ message: "Invalid filter type" });
      }
    }

    const report = await generateReport(filter || "Custom", startDate, endDate);
    console.log("Generated sales report:", report);

    return res.status(200).json(report);
  } catch (error) {
    console.error("Error generating sales report:", error);
    return res.status(500).json({ message: "Failed to get the sales report" });
  }
};

const generateReport = async (filter, startDate, endDate) => {
  console.log("Generating report from", startDate, "to", endDate);

  const matchStage = {
    $match: {
      createdAt: { $gte: startDate, $lte: endDate },
      status: { $in: ["Delivered", "Shipped"] },
    },
  };

  const groupStage = {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalAmount" },
      totalQuantity: { $sum: { $size: "$items" } },
      totalOrders: { $sum: 1 },
      orders: { $push: "$$ROOT" },
    },
  };

  const result = await Order.aggregate([matchStage, groupStage]);

  if (result.length === 0) {
    return {
      summary: {
        totalRevenue: 0,
        totalQuantity: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      },
      topProducts: [],
      timeSeries: [],
    };
  }

  const { totalRevenue, totalQuantity, totalOrders, orders } = result[0];

  // Process top products
  const productPerformance = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productPerformance[item.product]) {
        productPerformance[item.product] = {
          productName: item.productName,
          productBrand: item.productBrand,
          totalQuantity: 0,
          totalRevenue: 0,
        };
      }
      productPerformance[item.product].totalQuantity += item.quantity;
      productPerformance[item.product].totalRevenue += item.totalPrice;
    });
  });

  const topProducts = Object.values(productPerformance)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 10);

  // Generate time series data
  const timeSeries = generateTimeSeries(filter, startDate, endDate, orders);

  return {
    summary: {
      totalRevenue,
      totalQuantity,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    },
    topProducts,
    timeSeries,
  };
};

// Highlight: Updated to handle both filter and custom date ranges
const generateTimeSeries = (filter, startDate, endDate, orders) => {
  let timeSeriesData = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    let periodStart, periodEnd;

    switch (filter) {
      case "Daily":
        periodStart = startOfDay(currentDate);
        periodEnd = endOfDay(currentDate);
        currentDate = subDays(currentDate, -1);
        break;
      case "Weekly":
        periodStart = startOfWeek(currentDate);
        periodEnd = endOfWeek(currentDate);
        currentDate = subWeeks(currentDate, -1);
        break;
      case "Monthly":
        periodStart = startOfMonth(currentDate);
        periodEnd = endOfMonth(currentDate);
        currentDate = subMonths(currentDate, -1);
        break;
      case "Custom":
        periodStart = startOfDay(currentDate);
        periodEnd = endOfDay(currentDate);
        currentDate = subDays(currentDate, -1);
        break;
    }

    const periodOrders = orders.filter(
      (order) => order.createdAt >= periodStart && order.createdAt <= periodEnd
    );

    const periodRevenue = periodOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const periodQuantity = periodOrders.reduce(
      (sum, order) => sum + order.items.length,
      0
    );

    timeSeriesData.push({
      period: periodStart.toISOString().split("T")[0],
      revenue: periodRevenue,
      quantity: periodQuantity,
      orderCount: periodOrders.length,
    });

    if (currentDate > endDate) break;
  }

  return timeSeriesData.reverse();
};

export { generateSalesReport };