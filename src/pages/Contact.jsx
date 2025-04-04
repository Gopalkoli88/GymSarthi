import React from "react";
import ContactUs from "./HeaderofContactUs";
import Footer from "./Footer";
import Header from "./Header";
import { useSelector } from "react-redux";

const ContactUsmain = () => {
  const { user } = useSelector((state) => state.user);
  return (<>
    <div>
    
      <ContactUs />
      
    {/* <Footer /> */}
    </div>
    </>
  );
};

export default ContactUsmain;
