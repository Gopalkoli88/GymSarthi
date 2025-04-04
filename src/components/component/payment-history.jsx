import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PaymentHistoryPDF from "./PaymentHistoryPDF";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Import Popover components
import { Calendar } from "@/components/ui/calendar"; // Import your Calendar component
// Adjust the import based on your project structure

export const PaymentHistory = () => {
  const { payments } = useSelector((state) => state.admin);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState(null); // New state for start date
  const [endDate, setEndDate] = useState(null); // New state for end date

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

    setFilteredTransactions(filtered);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setStatus("all");
    setFilteredTransactions(transactions);
  };

  const generateCustomTransactionId = (originalId) => {
    const part1 = originalId.substring(0, 4);
    const part2 = originalId.substring(4, 8);
    const part3 = originalId.substring(originalId.length - 4);

    const prefix = "TXN";
    const sequenceNumber = "001";

    return `${prefix}-${part1}${part2}-${sequenceNumber}-${part3}`;
  };

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

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

    const daySuffix = (d) => {
      if (d > 3 && d < 21) return "th";
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

    return `${day}${daySuffix(day)} ${monthNames[month - 1]} ${year}`;
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container px-4 py-8 mx-auto md:px-6 mt-[-70px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Payment History</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="date-range"
              className="text-black whitespace-nowrap"
            >
              Date range:
            </Label>
            <div className="flex items-center gap-4">
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
              <span className="text-black">-</span>
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
          <div className="flex items-center gap-2">
            <Label htmlFor="status">Status:</Label>
            <Select
              id="status"
              value={status}
              onValueChange={(value) => setStatus(value)}
            >
              <SelectTrigger className="text-white bg-gray-900">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
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
              <TableHead>Status</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Plan Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{generateCustomTransactionId(tx._id)}</TableCell>
                <TableCell>
                  {formatDate(new Date(tx.paymentDate).toLocaleDateString())}
                </TableCell>
                <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                <TableCell>{tx.paymentMethod}</TableCell>
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
                <TableCell>{tx.userName}</TableCell>
                <TableCell>{tx.planName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button className="text-white transition-transform shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105">
          <PDFDownloadLink
            document={<PaymentHistoryPDF transactions={filteredTransactions} />}
            fileName="payment_history.pdf"
          >
            {({ loading }) =>
              loading ? "Preparing document..." : "Export to PDF"
            }
          </PDFDownloadLink>
        </Button>
      </div>
    </div>
  );
};

export default PaymentHistory;

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
