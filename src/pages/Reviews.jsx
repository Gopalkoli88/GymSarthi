 

//! swapnil makes :
// export default Reviews;
import { submitFeedback } from "@/redux/adminSlice";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reviewss from "./Reviewss";

const reviews = [
  {
    name: "Sarah Johnson",
    date: "2 days ago",
    review:
      "I recently purchased the LuminaCook Multi-Function Air Fryer and it's been a game-changer in my kitchen. It's so versatile and makes everything from crispy fries to healthy baked chicken. Highly recommend!",
    rating: 4,
  },
  {
    name: "Alex Smith",
    date: "3 weeks ago",
    review:
      "The SparkleShine Home Cleaning Robot has been a lifesaver! I used to spend hours cleaning my house every weekend, but now I can just turn on this little robot and let it do the work. It's incredibly efficient and navigates around obstacles with ease.",
    rating: 5,
  },
  {
    name: "Emily Parker",
    date: "10 weeks ago",
    review:
      "The battery life on these headphones is impressive, lasting me for long-haul flights without any issues. They are comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and I'd recommend these to anyone who values high-quality audio and peace and quiet.",
    rating: 3,
  },
];

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="hidden"
            />
            <svg
              className={`w-6 h-6 cursor-pointer ${
                ratingValue <= (hover || rating)
                  ? "text-[#eab308]"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.146 3.51a1 1 0 00.95.69h3.688c.969 0 1.371 1.24.588 1.81l-2.988 2.17a1 1 0 00-.364 1.118l1.146 3.51c.3.921-.755 1.688-1.54 1.118l-2.988-2.17a1 1 0 00-1.176 0l-2.988 2.17c-.784.57-1.839-.197-1.54-1.118l1.146-3.51a1 1 0 00-.364-1.118L2.735 8.937c-.783-.57-.38-1.81.588-1.81h3.688a1 1 0 00.95-.69l1.146-3.51z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

const Reviews = () => {
  const { user } = useSelector((state) => state.user);
  const carouselRef = useRef(null);

  const [ratings, setRatings] = useState(
    reviews.map((review) => review.rating)
  );
  const [comment, setComment] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (carouselRef.current) {
  //       const scrollLeft = carouselRef.current.scrollLeft;
  //       const maxScrollLeft =
  //         carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

  //       if (scrollLeft >= maxScrollLeft) {
  //         carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
  //       } else {
  //         carouselRef.current.scrollBy({
  //           left: carouselRef.current.clientWidth,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const maxScrollLeft =
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        if (scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({
            left: carouselRef.current.clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);
  const handleRatingChange = (index, rating) => {
    const newRatings = [...ratings];
    newRatings[index] = rating;
    setRatings(newRatings);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted comment:", comment);

    const commentData = {
      userName: user.name,
      user: user._id,
      comment,
    };

    const result = await dispatch(submitFeedback(commentData));
    if (result) {
      setComment("");
    }
  };

//   return (
//     <div className="w-full max-w-3xl mx-auto overflow-hidden text-white">
//       {/* <div
//         ref={carouselRef}
//         className="flex space-x-4 overflow-x-auto hide-scrollbar"
//       > */}
//       <div
//         ref={carouselRef}
//         className="flex space-x-4 overflow-x-auto hide-scrollbar"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             // className="flex-shrink-0 w-full p-6 bg-black rounded-lg"
//             className="flex-shrink-0 w-full p-6 bg-black rounded-lg min-h-[150px]" // Added min height
//           >
//             <div className="flex items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 border rounded-full">
//                   {review.name.charAt(0)}
//                   {review.name.charAt(review.name.indexOf(" ") + 1)}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{review.name}</h4>
//                   <p className="text-sm text-muted-foreground">{review.date}</p>
//                 </div>
//               </div>
//               <StarRating
//                 rating={ratings[index]}
//                 setRating={(rating) => handleRatingChange(index, rating)}
//               />
//             </div>
//             <p className="mt-4 text-muted-foreground">{review.review}</p>
//           </div>
//         ))}
//       </div>
//       {/* Comment Section */}
//       <form onSubmit={handleSubmit} className="mt-8">
//         {/* <h4 className="mb-2 font-semibold">Write a Review</h4> */}

//         <textarea
//           value={comment}
//           onChange={handleCommentChange}
//           className="w-full p-3 rounded-lg bg-[#000000] border-2 border-blue-600 text-white hover:border-blue-600 focus:outline-none"
//           placeholder="Write your comment here..."
//           rows="4"
//         />

//         <button
//           type="submit"
//           className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg"
//         >
//           Submit
//         </button>
//       </form>
//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//           overflow-x: auto;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Reviews;

return (
  <div className="w-full max-w-3xl mx-auto overflow-hidden text-white">
    <Reviewss className="mb-5 mt-5"/>
    {/* Reviews Section */} 
     {/* <div
      ref={carouselRef}
      className="flex px-2 py-4 space-x-6 overflow-x-auto hide-scrollbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full p-6 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-lg min-h-[160px] border-2 border-transparent hover:border-blue-500 transition-all duration-300 "
        >
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-gray-800 border-2 border-blue-500 rounded-full shadow-md">
                {review.name.charAt(0)}
                {review.name.charAt(review.name.indexOf(" ") + 1)}
              </div>
              <div>
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
            </div>

            <StarRating
              rating={ratings[index]}
              setRating={(rating) => handleRatingChange(index, rating)}
            />
          </div>

          
          <p className="mt-4 leading-relaxed text-gray-300">{review.review}</p>
        </div>
      ))}
    </div> */}

    {/* Comment Section */}
    <form onSubmit={handleSubmit} className="p-4 mt-10  rounded-lg shadow-md">
      <h4 className="mb-2 text-lg font-semibold text-gray-300">Write a Review</h4>

      <textarea
        value={comment}
        onChange={handleCommentChange}
        className="w-full p-3 text-white transition-all duration-300 bg-black border-2 border-gray-700 rounded-lg outline-none hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
        placeholder="Write your comment here..."
        rows="4"
      />

      <button
        type="submit"
        className="w-[80%] py-3 font-semibold transition duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105 mt-5"
      >
        Submit
      </button>
    </form>

    {/* Custom Scrollbar Hide */}
    <style jsx>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    `}</style>
  </div>
);
};
 export default Reviews;
