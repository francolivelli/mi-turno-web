"use client";
import { useMediaQuery } from "react-responsive";
import styles from "../../styles/components/CreateBookingLayout.module.css";
import BookingPanel from "./BookingPanel";
import Calendar from "./Calendar";
import BookingConfirmationPopUp from "./BookingConfirmationPopUp";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../features/stepSlice";
import { setDate } from "../features/dateSlice";

const CreateBookingLayout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleBookingSuccess = (id) => {
    setShowPopup(true);
    setBookingId(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hacer una reserva</h1>
      <div className={styles.components}>
        <BookingPanel onBookingSuccess={handleBookingSuccess} />
        {isDesktop && <Calendar />}
      </div>
      {showPopup && <BookingConfirmationPopUp bookingId={bookingId} />}
    </div>
  );
};

export default CreateBookingLayout;
