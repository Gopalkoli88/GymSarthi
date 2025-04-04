 


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AdminSidePanel from "./AdminSidePanel";
import {
  fetchMembershipGrowthByMonth,
  fetchMonthlyRevenue,
  fetchPlanPurchaseByMonth,
} from "@/redux/adminSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

// Register components for Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const MembershipGrowthChart = () => {
  const dispatch = useDispatch();
  const { membershipGrowth, planPurchaseGrowth, monthlyRevenue, status } =
    useSelector((state) => state.admin);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartType, setChartType] = useState("signups");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchMembershipGrowthByMonth(selectedYear));
    dispatch(fetchPlanPurchaseByMonth(selectedYear));
    dispatch(fetchMonthlyRevenue(selectedYear));
  }, [dispatch, selectedYear]);

  const handleDateChange = (date) => {
    setSelectedYear(date.getFullYear());
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyGrowthData = Array(12).fill(0);
  membershipGrowth.forEach((data) => {
    const monthIndex = data._id - 1;
    monthlyGrowthData[monthIndex] = data.count;
  });

  const monthlyPurchaseData = Array(12).fill(0);
  planPurchaseGrowth.forEach((data) => {
    const monthIndex = data._id - 1;
    monthlyPurchaseData[monthIndex] = data.count;
  });

  const monthlyRevenueData = Array(12).fill(0);
  monthlyRevenue.forEach((data) => {
    const monthIndex = data._id.month - 1;
    monthlyRevenueData[monthIndex] = data.totalRevenue;
  });

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label:
          chartType === "signups"
            ? "New Sign-Ups"
            : chartType === "purchases"
            ? "Plan Purchases"
            : "Monthly Revenue",
        data:
          chartType === "signups"
            ? monthlyGrowthData
            : chartType === "purchases"
            ? monthlyPurchaseData
            : monthlyRevenueData,
        backgroundColor:
          chartType === "signups"
            ? "rgba(99, 102, 241, 0.7)" // Indigo
            : chartType === "purchases"
            ? "rgba(16, 185, 129, 0.7)" // Emerald
            : "rgba(245, 158, 11, 0.7)", // Amber
        borderColor:
          chartType === "signups"
            ? "rgb(99, 102, 241)"
            : chartType === "purchases"
            ? "rgb(16, 185, 129)"
            : "rgb(245, 158, 11)",
        borderWidth: 2,
        borderRadius: 4, // Rounded bars
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Months",
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#9CA3AF", // Gray-400
        },
        ticks: {
          color: "#9CA3AF", // Gray-400
        },
      },
      y: {
        grid: {
          color: "#374151", // Gray-700
        },
        title: {
          display: true,
          text: chartType === "revenue" ? "Revenue (₹)" : "Number of Users",
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#9CA3AF", // Gray-400
        },
        ticks: {
          color: "#9CA3AF", // Gray-400
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#F3F4F6", // Gray-100
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937", // Gray-800
        titleColor: "#F3F4F6", // Gray-100
        bodyColor: "#D1D5DB", // Gray-300
        borderColor: "#374151", // Gray-700
        borderWidth: 1,
        padding: 10,
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        formatter: (value) => {
          if (chartType === "revenue") {
            return `₹${value}`;
          } else if (chartType === "purchases") {
            return `${value} Plans`;
          } else if (chartType === "signups") {
            return `${value} Users`;
          }
          return value;
        },
        color: "#F3F4F6", // Gray-100
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  };

  return (
    <AdminSidePanel>
    <div className="mt-[-50px]" >
    <h1 className="mb-6 text-3xl font-bold text-center text-black mt">
        Membership Growth & Plan Purchases
      </h1>
      <div className="w-4/5 p-8 mx-auto transition-all duration-300 transform shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl hover:shadow-3xl">


        {/* Chart Type Buttons */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex gap-3">
            <Button
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg ${
                chartType === "signups"
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600 shadow-md"
              }`}
              onClick={() => handleChartTypeChange("signups")}
            >
              User Sign-Ups
            </Button>
            <Button
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg ${
                chartType === "purchases"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600 shadow-md"
              }`}
              onClick={() => handleChartTypeChange("purchases")}
            >
              Plan Purchases
            </Button>
            <Button
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg ${
                chartType === "revenue"
                  ? "bg-amber-600 hover:bg-amber-700 shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600 shadow-md"
              }`}
              onClick={() => handleChartTypeChange("revenue")}
            >
              Monthly Revenue
            </Button>
          </div>

          {/* Year Picker */}
          <div className="relative">
            <DatePicker
              selected={new Date(selectedYear, 0, 1)}
              onChange={handleDateChange}
              showYearPicker
              dateFormat="yyyy"
              className="p-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg shadow-sm cursor-pointer w-28 "
            />
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-[400px]">
          {status === "loading" && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Loading...</p>
            </div>
          )}
          {status === "failed" && (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500">Error fetching data.</p>
            </div>
          )}
          {status === "succeeded" && (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>

        {/* Year Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
                    className="text-white transition-transform shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105"
                    onClick={() => handleYearChange(selectedYear - 1)}
          >
            Previous Year
          </Button>
          <Button
                    className="text-white transition-transform shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105"
                    onClick={() => handleYearChange(selectedYear + 1)}
          >
            Next Year
          </Button>
        </div>
      </div>
      </div>
    </AdminSidePanel>
  );
};

export default MembershipGrowthChart;