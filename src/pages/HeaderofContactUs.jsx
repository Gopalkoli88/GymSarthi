 
import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const InstagramIcon = (props) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = (props) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPinIcon = (props) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = (props) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TwitterIcon = (props) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function ContactUs() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="min-w-[80dvw] flex flex-col min-h-[100dvh] bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header Section */}
      <Header user={user} />
  
      {/* Hero Section */}
      <div className="relative py-16 md:py-20">
        <section className="container mx-auto text-center">
          <div className="p-6 rounded-lg shadow-lg bg-black/70">
            <h1 className="text-5xl font-extrabold tracking-wide text-blue-500">
              Get in Touch
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              We'd love to hear from you. Feel free to reach out with any
              questions or feedback.
            </p>
          </div>
        </section>
  
        {/* Contact Details & Map Section */}
        <section className="container grid grid-cols-1 gap-10 mx-auto mt-12 md:grid-cols-2">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-blue-500">Contact Us</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-4">
                <MapPinIcon className="w-6 h-6 text-blue-500" />
                <p>123 Fitness Blvd, Gymtown USA</p>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-blue-500" />
                <p>+1 (555) 555-5555</p>
              </div>
              <div className="flex items-center gap-4">
                <MailIcon className="w-6 h-6 text-blue-500" />
                <p>info@gymmanagement.com</p>
              </div>
              <div className="flex items-center gap-4">
                <InstagramIcon className="w-6 h-6 text-blue-500" />
                <p>@gymmanagement</p>
              </div>
              <div className="flex items-center gap-4">
                <TwitterIcon className="w-6 h-6 text-blue-500" />
                <p>@gymmanagement</p>
              </div>
            </div>
  
            {/* Trainer Images */}
            <div className="flex gap-6 mt-6">
              {[
                "https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://media.istockphoto.com/id/1201517718/photo/portrait-of-personal-trainer-in-gym.jpg?s=612x612&w=0&k=20&c=aiUVLyRtOHzKXJ0ocxx-13rz3TMYffcBGULzZxtNpHc=",
                "https://i0.wp.com/www.miamilakesathleticclub.com/wp-content/uploads/2018/02/IMG_2625.jpg?ssl=1",
              ].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Trainer ${index + 1}`}
                  className="object-cover w-16 h-16 transition-transform transform border-2 border-blue-500 rounded-full shadow-lg hover:scale-110"
                />
              ))}
            </div>
            <p className="mt-4 text-lg text-gray-300">
              Meet our expert trainers who are here to help you reach your fitness goals.
            </p>
          </div>
  
          {/* Google Map */}
          <div className="relative overflow-hidden transition-transform transform rounded-lg shadow-lg hover:scale-105">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242515.10694080067!2d73.398581078125!3d18.242130658317325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc28fa3eb07c019%3A0xe2f323ba03aacd31!2sRajgad%20Fort!5e0!3m2!1sen!2sin!4v1633020553705!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: "0", opacity: "0.85" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
  
}
// import React from "react";
// import { useSelector } from "react-redux";

// const InstagramIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//     <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//   </svg>
// );

// const MailIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect width="20" height="16" x="2" y="4" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );

// const MapPinIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );

// const PhoneIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );

// const TwitterIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//   </svg>
// );

// export default function ContactUs() {
//   const { user } = useSelector((state) => state.user);

//   return (
//     <div className="min-w-[80dvw] flex flex-col min-h-[100dvh] bg-gray-100">
//       <header className="py-4 text-center text-white bg-black shadow-lg">
//         <h1 className="text-3xl font-bold">Header Section</h1>
//       </header>
//       <div className="relative">
//         {/* Background image */}
//         <div
//           className="absolute inset-0 bg-center bg-cover"
//           style={{
//             backgroundImage:
//               'url("https://t4.ftcdn.net/jpg/00/49/63/65/360_F_49636530_c5nCkLmWDW2wQSLK7IVyF3JJWkrBAIjd.jpg")',
//             filter: "brightness(60%)",
//           }}
//         />
//         <div className="absolute inset-0 bg-black/70"></div>

//         {/* Header section */}
//         <div className="relative py-12 text-white md:py-6">
//           <section className="container mx-auto mb-12">
//             <div className="p-8 text-center transition-transform transform rounded-lg shadow-lg bg-black/80 hover:scale-105">
//               <h1 className="text-5xl font-extrabold">Get in Touch</h1>
//               <p className="mt-4 text-xl">
//                 We'd love to hear from you. Feel free to reach out with any
//                 questions or feedback.
//               </p>
//             </div>
//           </section>

//           <section className="container mx-auto">
//             <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
//               <div className="space-y-6 md:space-y-8">
//                 <h2 className="mb-6 text-4xl font-bold">Contact Us</h2>
//                 <div className="space-y-4">
//                   {[
//                     { icon: <MapPinIcon className="w-8 h-8 text-blue-600" />, text: "123 Fitness Blvd, Gymtown USA" },
//                     { icon: <PhoneIcon className="w-8 h-8 text-blue-600" />, text: "+1 (555) 555-5555" },
//                     { icon: <MailIcon className="w-8 h-8 text-blue-600" />, text: "info@gymmanagement.com" },
//                     { icon: <InstagramIcon className="w-8 h-8 text-blue-600" />, text: "@gymmanagement" },
//                     { icon: <TwitterIcon className="w-8 h-8 text-blue-600" />, text: "@gymmanagement" },
//                   ].map((item, index) => (
//                     <div key={index} className="flex items-center gap-4 p-3 transition-all duration-300 rounded-lg shadow-md bg-white/20 hover:bg-blue-600 hover:text-white">
//                       {item.icon}
//                       <p className="text-lg">{item.text}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex gap-6 mt-6">
//                   {[
//                     "https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//                     "https://media.istockphoto.com/id/1201517718/photo/portrait-of-personal-trainer-in-gym.jpg?s=612x612&w=0&k=20&c=aiUVLyRtOHzKXJ0ocxx-13rz3TMYffcBGULzZxtNpHc=",
//                     "https://i0.wp.com/www.miamilakesathleticclub.com/wp-content/uploads/2018/02/IMG_2625.jpg?ssl=1"
//                   ].map((src, index) => (
//                     <img
//                       key={index}
//                       src={src}
//                       alt={`Trainer ${index + 1}`}
//                       className="object-cover w-16 h-16 transition-transform transform border-2 border-blue-600 rounded-full shadow-lg hover:scale-105"
//                     />
//                   ))}
//                 </div>
//                 {user && (
//                   <div className="mt-6 text-center">
//                     <p className="text-xl font-semibold">Welcome back, {user.name}!</p>
//                   </div>
//                 )}
//               </div>
//               <div className="p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="mb-6 text-4xl font-bold">Send Us a Message</h2>
//                 <form className="space-y-6">
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full p-4 transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full p-4 transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//                   />
//                   <textarea
//                     rows="4"
//                     placeholder="Your Message"
//                     className="w-full p-4 transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
//                   />
//                   <button className="w-full py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
