// components/ui/Carousel.js
import React, { useState } from "react";

const styles = {
  carousel: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  carouselContent: {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
  },
  carouselItem: {
    minWidth: "100%",
  },
  carouselButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    padding: "0.5rem",
    cursor: "pointer",
    zIndex: 10,
  },
  carouselPrev: {
    left: "10px",
  },
  carouselNext: {
    right: "10px",
  },
};

export function Carousel({ children, className, ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={`relative ${className}`} style={styles.carousel} {...props}>
      <div
        className="flex"
        style={{
          ...styles.carouselContent,
          transform: translateX(`-${currentIndex * 100}%`),
        }}
      >
        {children}
      </div>
      <button
        style={{ ...styles.carouselButton, ...styles.carouselPrev }}
        onClick={handlePrevious}
        aria-label="Previous Slide"
      >
        &lt;
      </button>
      <button
        style={{ ...styles.carouselButton, ...styles.carouselNext }}
        onClick={handleNext}
        aria-label="Next Slide"
      >
        &gt;
      </button>
    </div>
  );
}

export function CarouselContent({ children }) {
  return <>{children}</>;
}

export function CarouselItem({ children }) {
  return <div style={styles.carouselItem}>{children}</div>;
}

export function CarouselPrevious() {
  return null; // Implement if needed
}

export function CarouselNext() {
  return null; // Implement if needed
}