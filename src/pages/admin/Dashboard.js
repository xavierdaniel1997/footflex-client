import React, {useEffect, useState} from "react";
import BreadCrumbWithButton from "../../components/admin/BreadCrumbWithButton";
import {useLocation} from "react-router-dom";
import StatusCard from "../../components/admin/Dashboard/StatusCard";
import SaleChart from "../../components/admin/Dashboard/SaleChart";
import BestItems from "../../components/admin/Dashboard/BestItems";
import api from "../../config/axiosConfig";

const Dashboard = () => {
  const location = useLocation();
  const [currentMonthData, setCurrentMonthData] = useState({});
  const [lastMonthData, setLastMonthData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard/status");
        const data = response.data.data;

        setCurrentMonthData({
          totalSales: data.totalSales,
          totalOrders: data.totalOrders,
          totalProductsSold: data.totalProductsSold,
          totalRevenue: data.totalRevenue,
          totalProducts: data.totalProducts,
        });

        setLastMonthData({
          lastMonthSales: data.lastMonthSales,
          lastMonthOrders: data.lastMonthOrders,
          lastMonthProductsSold: data.lastMonthProductsSold,
          lastMonthRevenue: data.lastMonthRevenue,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const calculatePercentageChange = (current, last) => {
    if (last === 0) return current === 0 ? 0 : 100;
    return ((current - last) / last) * 100;
  };

  return (
    <div className="flex flex-col">
      <BreadCrumbWithButton
        noButton={false}
        componentLocation={"Dashboard"}
        location={location.pathname}
      />
      <div className="px-10">
        <div className="flex gap-6">
          <StatusCard
            cardName="Total Sales"
            color="#3498db"
            totalAmout={currentMonthData.totalSales}
            progressValueProp={calculatePercentageChange(
              currentMonthData.totalSales,
              lastMonthData.lastMonthSales
            )}
          />
          <StatusCard
            cardName="Total Orders"
            color="#E85C0D"
            totalAmout={currentMonthData.totalOrders}
            progressValueProp={calculatePercentageChange(
              currentMonthData.totalOrders,
              lastMonthData.lastMonthOrders
            )}
          />
          <StatusCard
            cardName="Total Products"
            color="#2ecc71"
            totalAmout={currentMonthData.totalProducts}
            progressValueProp={calculatePercentageChange(
              currentMonthData.totalProductsSold,
              lastMonthData.lastMonthProductsSold
            )}
          />
          <StatusCard
            cardName="Total Revenue"
            color="#8e44ad"
            totalAmout={currentMonthData.totalRevenue}
            progressValueProp={calculatePercentageChange(
              currentMonthData.totalRevenue,
              lastMonthData.lastMonthRevenue
            )}
          />
        </div>
      </div>

      <div className="mt-6 px-10 flex justify-between gap-6">
        <div className="flex-1 h-[400px]">
          <SaleChart />
        </div>
        <div className="bg-white shadow rounded-lg h-[392px] overflow-y-auto hide-scrollbar">
          <BestItems />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
