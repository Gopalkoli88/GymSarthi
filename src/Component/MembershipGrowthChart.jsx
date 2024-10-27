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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the DataLabels plugin
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
            ? "rgba(34, 92, 229, 0.7)"
            : chartType === "purchases"
            ? "rgba(75, 192, 192, 0.7)"
            : "rgb(132 204 22)",
        borderColor:
          chartType === "signups"
            ? "rgb(34, 92, 229)"
            : chartType === "purchases"
            ? "rgb(75, 192, 192)"
            : "rgb(132 204 22)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Months",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: chartType === "revenue" ? "Revenue (₹)" : "Number of Users",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`, // Add ₹ symbol in tooltip
        },
      },
      datalabels: {
        display: true, // Always display the labels
        align: "end",
        anchor: "end",
        formatter: (value) => {
          if (chartType === "revenue") {
            return `₹${value}`; // Add ₹ symbol in labels for revenue only
          } else if (chartType === "purchases") {
            return `${value} Plans`;
          } else if (chartType === "signups") {
            return `${value} Users`;
          }
          return value;
        }, // Add ₹ symbol in labels
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  };

  return (
    <AdminSidePanel>
      <div className="w-4/5 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Membership Growth & Plan Purchases
        </h1>
        <div className="mb-5 flex flex-wrap items-center justify-between">
          <div className="gap-3 flex ">
            <Button
              // className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => handleChartTypeChange("signups")}
            >
              User Sign-Up Growth
            </Button>
            <Button
              // className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={() => handleChartTypeChange("purchases")}
            >
              Plan Purchase Growth
            </Button>
            <Button
              // className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={() => handleChartTypeChange("revenue")}
            >
              Monthly Revenue
            </Button>
          </div>

          <div className="relative flex gap-2 items-center justify-center outline-none border-none">
            {/* <p className="text-gray-500 text-sm mt-1">Year: {selectedYear}</p> */}
            <div className="relative outline-none border-none">
              <DatePicker
                selected={new Date(selectedYear, 0, 1)} // Set the date to January of the selected year
                onChange={handleDateChange}
                showYearPicker
                value={`Year ${selectedYear}`}
                dateFormat="yyyy"
                className="bg-blue-500 outline-none border border-gray-300 rounded-md p-2 text-gray-700 shadow-sm focus:outline-none border-none  focus:ring-2 focus:ring-blue-500 cursor-pointer w-28 justify-center"
                calendarClassName="custom-calendar"
              />
            </div>
          </div>
        </div>

       
        <div className="h-96 w-full">
          {status === "loading" && <p className="text-center">Loading...</p>}
          {status === "failed" && (
            <p className="text-center text-red-500">Error fetching data.</p>
          )}
          {status === "succeeded" && (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>
      </div>
      <div>
      <div className="mb-5 flex gap-4 items-center justify-center mt-5">
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-30 hover:bg-blue-700"
            onClick={() => handleYearChange(selectedYear - 1)} // Previous year
          >
            Previous Year
          </Button>
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-30 hover:bg-blue-700"
            onClick={() => handleYearChange(selectedYear + 1)} // Next year
          >
            Next Year
          </Button>
        </div>
      </div>
    </AdminSidePanel>
  );
};

export default MembershipGrowthChart;
