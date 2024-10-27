import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MembershipPlansSlider = ({ plans }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef(null);

  // Check if slider should be active
  const isSliderActive = plans && plans.length > 3;

  // Custom SVG icons
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-5 w-5 text-green-500"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const XIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-5 w-5 text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= Math.ceil(plans.length / 3) ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Math.ceil(plans.length / 3) - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isSliderActive) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= Math.ceil(plans.length / 3)) {
            return 0; // Loop back to the first slide
          }
          return nextIndex;
        });
      }, 15000); // Change slide every 3 seconds

      slideIntervalRef.current = slideInterval;

      return () => {
        clearInterval(slideIntervalRef.current);
      };
    }
  }, [isSliderActive, plans.length]);

  // Pause sliding on hover
  const handleMouseEnter = () => {
    if (isSliderActive) {
      clearInterval(slideIntervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isSliderActive) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= Math.ceil(plans.length / 3)) {
            return 0; // Loop back to the first slide
          }
          return nextIndex;
        });
      }, 3000); // Change slide every 3 seconds

      slideIntervalRef.current = slideInterval;
    }
  };

  const numberOfSlides = Math.ceil(plans.length / 3);
  const visiblePlans = plans.slice(currentIndex * 3, currentIndex * 3 + 3);

  const navigate = useNavigate();

  const handleClickJoin = (planId) => {
    navigate(`/purchase-plan/${planId}`);
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex  transition-transform duration-500 ease-in-out"
        style={{
          transform: isSliderActive
            ? `translateX(-${currentIndex * (100 / numberOfSlides)}%)`
            : "translateX(0)",
          width: isSliderActive ? `${numberOfSlides * 100}%` : "100%",
        }}
      >
        <div
          className="flex flex-row gap-2 "
          style={{
            width: isSliderActive ? `${100 / numberOfSlides}%` : "100%",
          }}
        >
          {Array.isArray(plans) && plans.length > 0 ?
            plans.map((plan, index) => (
              <div
                key={plan._id}
                className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center justify-center space-y-4 p-6 rounded-lg shadow-sm bg-black text-white   border-2 space-x-3  *:
                hover:bg-gradient-to-b hover:from-[#1455f4] via-transparent    hover:to-[rgba(0,0,0,0.583158263305322)] hover:text-white 
                 "
              >
                <div className="text-center h-72">
                  <p className="text-4xl font-bold text-primary">
                    ${plan.price}
                  </p>
                  <p className="text-lg font-bold">/ per month</p>
                  <h3 className="mt-2 text-lg font-bold">{plan.name}</h3>
                  {/* Image placed here */}
                  {/* <img
                    src={plan.imageUrl} // Assuming imageUrl is a property of the plan
                    alt={plan.name}
                    className="my-4 h-32 w-32 object-cover rounded-full mx-auto"
                  /> */}
                </div>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Access to gym facilities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Basic fitness classes
                  </li>
                  <li className="flex items-center gap-2">
                    <XIcon />
                    Personal training sessions
                  </li>
                </ul>

                <Button
                  onClick={() => handleClickJoin(plan._id)}
                  className="w-full   bg-[#1455f4]"
                >
                  Join Now
                </Button>
              </div>
            )) : (
              <div>No Plans Available</div>
            )}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

// Example usage
const MembershipPlanSliderComp = () => {
  const { plans } = useSelector((state) => state.admin);

  const handleClickJoin = (id) => {
    console.log("Join plan with id:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <MembershipPlansSlider plans={plans} />
    </div>
  );
};

export default MembershipPlanSliderComp;
