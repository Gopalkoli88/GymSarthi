import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
 
 import { toast, ToastContainer } from "react-toastify";
import MemberSidePanel from "@/Component/MemberSidePanel";
import { bookSlot, cancelSlot, extendSlot, fetchAvailableSlots, fetchUserSlot, updateSlotByMember } from "@/redux/slotSlice";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const MemberSlotManagement = () => {
  const dispatch = useDispatch();
  const {  slots, loading } = useSelector(
    (state) => state.slot
  );
  const {bookedSlot}=useSelector((state)=> state.slot.userslot);

  useEffect(() => {
    dispatch(fetchAvailableSlots());
    dispatch(fetchUserSlot());
  }, [dispatch]);

  const handleBook = (slotId) => {
    dispatch(bookSlot(slotId))
      .unwrap()
      .then(() => {
        toast.success("Slot booked successfully!");
        dispatch(fetchAvailableSlots());
        dispatch(fetchUserSlot());
      })
      .catch((error) => {
        console.log("book slot error : ", error);
        toast.error(error?.message || "Failed to book slot!");
      });
  };
  
  const handleCancel = (slotId) => {
    dispatch(cancelSlot(slotId))
      .unwrap()
      .then(() => {
        toast.success("Slot canceled successfully!");
        dispatch(fetchUserSlot());
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to cancel slot!");
      });
  };
  
  const handleExtend = (slotId) => {
    dispatch(extendSlot(slotId))
      .unwrap()
      .then(() => {
        toast.success("Slot extended!");
        dispatch(fetchUserSlot());
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to extend slot!");
      });
  };
  
  const handleUpdate = (newSlotId) => {
    if (!bookedSlot) {
      toast.error("You don't have any booked slot to shift.");
      return;
    }
    dispatch(updateSlotByMember({ oldSlotId: bookedSlot?._id, newSlotId }))
      .unwrap()
      .then(() => {
        toast.success("Slot shifted successfully!");
        dispatch(fetchUserSlot());
        dispatch(fetchAvailableSlots());
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to shift slot!");
      });
  };
  

  return (
    <MemberSidePanel>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Slot Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots && slots.map((slot) => (
            <motion.div
              key={slot._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg rounded-lg overflow-hidden p-4">
                <CardContent>
                  <h3 className="text-lg font-semibold">Start-time : {slot.startTime}</h3>
                  <h3 className="text-lg font-semibold">End-time : {slot.endTime}</h3>

                  <p>Capacity: {slot.maxCapacity}</p>

                  <p>Booked: {slot.bookedMembers.length}</p>
                  {bookedSlot?._id === slot._id ? (
                    <div className="flex gap-2 mt-3">
                      <Button onClick={() => handleExtend(slot._id)}>Extend</Button>
                      <Button onClick={() => handleCancel(slot._id)}>Cancel</Button>
                    </div>
                  ) : bookedSlot ? (
                    <Button onClick={() => handleUpdate(slot._id)}>Shift to this Slot</Button>
                  ) : (
                    <Button onClick={() => handleBook(slot._id)}>Book Slot</Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </MemberSidePanel>
  );
};

export default MemberSlotManagement;
