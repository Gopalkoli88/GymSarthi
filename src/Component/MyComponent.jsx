import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "@/redux/userSlice"; // Adjust the import according to your file structure

const MyComponent = () => {
  const dispatch = useDispatch();

  // Accessing the user data from the Redux store
  const { user } = useSelector((state) => state.user); // Assuming your state has 'user'

  const [userDetails, setUserDetails] = useState(null);

  // Retrieve user ID from Redux store
  const userId = user?.id || user?._id; // Use user._id or user.id based on your structure

  useEffect(() => {
    if (!user) {
      // If user is not available in the store, fetch user details
      dispatch(getUserDetails());
    } else {
      // If user is already in the store, set the user details
      setUserDetails(user);
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1>Welcome to MyComponent!</h1>
      {userDetails ? (
        <>
          <p>User ID: {userId}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          {/* Add any other user details you want to display */}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default MyComponent;
