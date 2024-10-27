import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { purchasePlan } from "@/redux/userSlice";
import "../../App.css";
import Header from "@/pages/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Spinner component
// const Spinner = () => (
//   <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent border-white"></div>
// );

// Spinner Component using Tailwind CSS
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    ></path>
  </svg>
);
export function PurchasePlanPage() {
  const { plans } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedPlan = plans.find((plan) => plan._id === id);

  const [paymentInfo, setPaymentInfo] = useState({
    planId: id,
    paymentMethod: "credit_card",
    amount: selectedPlan ? selectedPlan.price : 0,
    paymentDetails: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      name: "",
      zip: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [name]: value,
      },
    }));
  };

  // validate the plan purchase validation :
  const validateForm = () => {
    const newErrors = {};
    const { cardNumber, expirationDate, cvv, name, zip } =
      paymentInfo.paymentDetails;

    // Validate Card Number (should be 16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Validate Expiry Date (should be in MM/YY format and valid date)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      newErrors.expirationDate = "Expiry date must be in MM/YY format.";
    }

    // Validate CVV (should be 3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVC must be 3 or 4 digits.";
    }

    // Validate Name on Card (should not be empty)
    if (name.trim() === "") {
      newErrors.name = "Name on card is required.";
    }

    // Validate Zip Code (should be 5 digits)
    if (!/^\d{5}$/.test(zip)) {
      newErrors.zip = "Zip code must be 5 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentInfo({
      ...paymentInfo,
      paymentMethod: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    if (validateForm()) {
      setLoading(true);

      setTimeout(async () => {
        try {
          // Call the API to process payment
          const success = await dispatch(purchasePlan(paymentInfo));
          setLoading(false);
          if (success) {
            setShowThankYou(true);
            setTimeout(() => {
              navigate("/member-dashboard");
            }, 1000);
          } else {
            setErrorMessage("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }, 3000);
    }else{
      toast.error("Plan Info. Not Validate");
    }
   } catch (error) {
    toast.error(error.message || "Plan not purchse something went wrong...");
   }
  };

  if (!selectedPlan) {
    return <p>Plan Not Found</p>;
  }

  const paymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "upi", label: "UPI" },
  ];

  return (
    <div className="min-w-[80dvw] flex mt-5 flex-col min-h-[100dvh]">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Spinner />
            <span className="text-white mt-4">Processing...</span>
          </div>
        </div>
      )}
      <Header user={user} />
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
        {showThankYou && (
          <div className="popup-message">
            <p>Thank you for your purchase!</p>
          </div>
        )}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold">Purchase Plan</h1>
            <Card>
              <CardHeader>
                <CardTitle>{selectedPlan.name}</CardTitle>
                <CardDescription>
                  Unlock full access to our gym facilities and services.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">
                      ${selectedPlan.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  </div>
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Change Plan
                  </Button>
                </div>
                <Separator />
                <div className="grid gap-2">
                  {[
                    "Unlimited access to gym",
                    "Free personal training sessions",
                    "Discounts on supplements",
                    "Access to exclusive events",
                  ].map((benefit, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <CheckIcon className="w-5 h-5 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Enter your payment information to complete your purchase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      required
                      onChange={handleInputChange}
                      value={paymentInfo.paymentDetails.name}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      required
                      value={paymentInfo.paymentDetails.cardNumber}
                      onChange={handleInputChange}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 text-sm">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expirationDate">Expiry Date</Label>
                      <Input
                        id="expirationDate"
                        name="expirationDate"
                        type="text"
                        placeholder="MM/YY"
                        required
                        value={paymentInfo.paymentDetails.expirationDate}
                        onChange={handleInputChange}
                      />
                      {errors.expirationDate && (
                        <p className="text-red-500 text-sm">
                          {errors.expirationDate}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVC</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        required
                        value={paymentInfo.paymentDetails.cvv}
                        onChange={handleInputChange}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm">{errors.cvv}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input
                        id="zip"
                        type="text"
                        placeholder="12345"
                        required
                        name="zip"
                        onChange={handleInputChange}
                        value={paymentInfo.paymentDetails.zip}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-sm">{errors.zip}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      id="paymentMethod"
                      value={paymentInfo.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* 
                  <Button type="submit" className="mt-4">
                    Purchase Plan
                  </Button> */}

                  <Button
                    type="Submit"
                    className="mt-4 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner /> Processing...
                      </div>
                    ) : (
                      "Purchase Plan"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <Progress value={50} />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LockIcon(props) {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
