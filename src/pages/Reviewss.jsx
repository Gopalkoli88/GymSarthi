import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "FitStart Plan",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor ut labore dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    image:
      "https://res.cloudinary.com/dwdyrv73w/image/upload/v1733566261/gym/wf9jjhjsgimxngxze4ln.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "EliteX Plan",
    quote:
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.",
    image:
      "https://res.cloudinary.com/dwdyrv73w/image/upload/v1733567597/gym/cp5wf8eidqnbw8ynzlxa.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Sarah Williams",
    quote:
      "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam.",
    image:
      "https://res.cloudinary.com/dwdyrv73w/image/upload/v1733566780/gym/uqfwdok12noqs0gzycci.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "FamilyFusion Plan",
    quote:
      "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.",
    image:
      "https://res.cloudinary.com/dwdyrv73w/image/upload/v1733567648/gym/sfpnmnx3cta4bpxxwxne.jpg",
    rating: 4,
  },
];

function Reviewss() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" backdrop-blur-sm rounded-xl p-8 w-full max-w-full relative"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white text-3xl font-bold mb-12"
        >
          Client Reviews
        </motion.h2>
        <div className="relative h-[400px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full"
            >
              <div className="grid md:grid-cols-[300px,1fr] gap-8 items-center">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: [-3, 0, -3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -top-4 -left-4 w-full h-full bg-[#030406] rounded-lg"
                  />
                  <motion.div
                    animate={{
                      rotate: [1, -1, 1],
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                    className="absolute -top-2 -left-2 w-full h-full bg-[#0E172A] rounded-lg"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative  p-5 rounded-lg shadow-lg"
                  >
                    <img
                      src={testimonials[currentSlide].image}
                      alt={testimonials[currentSlide].name}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-cover rounded transition-transform duration-300"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-center mt-0"
                    >
                      <h3 className="font-bold text-lg">
                        {testimonials[currentSlide].name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentSlide].role}
                      </p>
                      <div className="flex justify-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= testimonials[currentSlide].rating
                                ? "text-[#BB8F06] fill-[#BB8F06]"
                                : "text-[#BB8F06]"
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#FFFF] text-lg leading-relaxed"
                  >
                    <motion.span
                      animate={{
                        opacity: [0.2, 0.3, 0.2],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="absolute -left-8 top-0 text-[120px] text-white/20 font-serif"
                      aria-hidden="true"
                    >
                      "
                    </motion.span>
                    {testimonials[currentSlide].quote}
                    <motion.span
                      animate={{
                        opacity: [0.2, 0.3, 0.2],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1.5,
                      }}
                      className="absolute -right-4 bottom-0 text-[120px] text-white/20 font-serif"
                      aria-hidden="true"
                    >
                      "
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Reviewss;
