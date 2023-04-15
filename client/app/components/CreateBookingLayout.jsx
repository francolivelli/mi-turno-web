"use client";
import { useMediaQuery } from "react-responsive";
import styles from "../../styles/components/CreateBookingLayout.module.css";
import BookingPanel from "./BookingPanel";
import Calendar from "./Calendar";

const CreateBookingLayout = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hacer una reserva</h1>
      <div className={styles.components}>
        <BookingPanel />
        {isDesktop && <Calendar />}
      </div>
    </div>
  );
};

export default CreateBookingLayout;
