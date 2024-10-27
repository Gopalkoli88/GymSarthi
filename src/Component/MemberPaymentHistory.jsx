 


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/michael-dam-mEZ3PoFGs_k-unsplash (1).jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentHistoryPDF from "../components/component/PaymentHistoryPDF";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";



import {
  fetchUserPaymentInfo,
  fetchUserPlanInfo,
  fetchUserTasksInfo,
  fetchUserTrainerInfo,
} from "@/redux/userSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import MemberSidePanel from "./MemberSidePanel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
const MemberPaymentHistory = () => {
  const { user, trainer, error, plan, payments, tasks } = useSelector(
    (state) => state.user
  );
  
  console.log("member paymentinfo :", payments);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState(payments);
  const [filteredTransactions, setFilteredTransactions] =
    useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState(null); // New state for start date
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(fetchUserPaymentInfo());
    }
  }, [dispatch, navigate, user]);

  useEffect(() => {
    const fetchUserAndPlanDetails = async () => {
      const updatedTransactions = await Promise.all(
        payments.map(async (tx) => {
          let userName = "N/A";
          let planName = "N/A";

          try {
            if (tx.userId) {
              userName = tx.userId.name;
            }
            if (tx.planId) {
              planName = tx.planId.name;
            }
          } catch (error) {
            console.error("Failed to fetch user or plan details", error);
          }

          return {
            ...tx,
            userName,
            planName,
          };
        })
      );

      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
    };
    
    fetchUserAndPlanDetails();
  }, [payments]);

  const handleFilterChange = () => {
    let filtered = transactions;

    if (startDate && endDate) {
      filtered = filtered.filter(
        (tx) =>
          new Date(tx.paymentDate) >= new Date(startDate) &&
          new Date(tx.paymentDate) <= new Date(endDate)
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((tx) => tx.status.toLowerCase() === status);
    }
     console.log("filtered data : " , filtered);
    setFilteredTransactions(filtered);
  };

  const handleExport = (format) => {
    console.log(`Exporting transactions in ${format} format`);
  };

  const handleReset = () => {
    handleFilterChange();
    setDateRange({ start: "", end: "" });
    setFilteredTransactions(transactions);
    
  };

  function generateCustomTransactionId(originalId) {
    // Extract parts of the original ID
    const part1 = originalId.substring(0, 4); // First 4 characters
    const part2 = originalId.substring(4, 8); // Next 4 characters
    const part3 = originalId.substring(originalId.length - 4); // Last 4 characters

    // Add custom characters or logic
    const prefix = "TXN"; // Custom prefix
    const sequenceNumber = "001"; // Example sequence number or could be dynamically generated

    // Combine to form the custom transaction ID
    const customTransactionId = `${prefix}-${part1}${part2}-${sequenceNumber}-${part3}`;

    return customTransactionId;
  }

  function formatDate(dateString) {
    // Convert the date string to a Date object
    const [month, day, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    // Define the array of month names
    const monthNames = [
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

    // Get the ordinal suffix for the day
    const daySuffix = (d) => {
      if (d > 3 && d < 21) return "th"; // special case for 11th-13th
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format the date
    const formattedDate = `${day}${daySuffix(day)} ${
      monthNames[month - 1]
    } ${year}`;

    return formattedDate;
  }

  if (status == "failed") {
    toast.error(error);
  }

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div> 
      <MemberSidePanel>
        <div className="container px-4 py-8 mx-auto md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Payment History</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="date-range" className="whitespace-nowrap">
                Date range:
                </Label>
                <div className="flex items-center gap-4 mr-8" >
                  
                  <Popover>
                <PopoverTrigger asChild>
                  <Button className="justify-start w-full font-normal">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                 
                    {startDate ? formatDateToDDMMYYYY(startDate) : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      if (endDate && date > endDate) {
                        setEndDate(null); // Reset end date if start date is after it
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              <span>-</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="justify-start w-full font-normal">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {/* {endDate ? endDate.toLocaleDateString() : "End Date"} */}
                    {endDate ? formatDateToDDMMYYYY(endDate) : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => setEndDate(date)}
                  />
                </PopoverContent>
              </Popover>
                </div>
              </div>

              <Button className="w-1/2" onClick={handleFilterChange}>
                Filter
              </Button>
              <Button className="w-1/2" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>

                  <TableHead>Status</TableHead>

                  {/* <TableHead>Plan Name</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length >0 ?
                 filteredTransactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>{generateCustomTransactionId(tx._id)}</TableCell>
                    <TableCell>
                      {formatDate(
                        new Date(tx.paymentDate).toLocaleDateString()
                      )}
                    </TableCell>
                    <TableCell>${tx.amount.toFixed(2)}</TableCell>
                    <TableCell>{tx.paymentMethod}</TableCell>
                    <TableCell>{tx.userId.name}</TableCell>
                    <TableCell>{tx.planId.name}</TableCell>
                    <TableCell>
                      <Badge
                        className="px-5 py-2"
                        variant={
                          tx.status.toLowerCase() === "completed"
                            ? "secondary"
                            : tx.status.toLowerCase() === "pending"
                            ? "outline"
                            : "danger"
                        }
                      >
                        {tx.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    {/* <TableCell>{tx.planName}</TableCell> */}
                    {console.log(
                      "member currentplan information :",
                      filteredTransactions[0].status
                    )}
                    {/* <p>{tx.planName}</p> */}
                  </TableRow>
                )) : (
                

                  <Button className="m-2">No Payments</Button>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            {/* <Button  onClick={() => handleExport("pdf")}>
              Export to PDF
            </Button> */}
            <Button>
              <PDFDownloadLink
                document={
                  <PaymentHistoryPDF transactions={filteredTransactions} />
                }
                fileName="payment_history.pdf"
              >
                {({ loading }) =>
                  loading ? "Preparing document..." : "Export to PDF"
                }
              </PDFDownloadLink>
            </Button>
          </div>
        </div>
      </MemberSidePanel>
    </div>
  );
};

export default MemberPaymentHistory;


function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
