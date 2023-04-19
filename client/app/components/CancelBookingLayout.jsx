"use client";
import CancelPanel from "./CancelPanel";
import BookingInformation from "./BookingInformation";
import { useMediaQuery } from "react-responsive";
import styles from "../../styles/components/CancelBookingLayout.module.css";
import { useSearchParams } from "next/navigation";

const CancelBookingLayout = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 481px)",
  });

  const bookingId = useSearchParams().get("id");

  return (
    <div className={styles.container}>
      <CancelPanel bookingId={bookingId}/>
      {isDesktop && <BookingInformation bookingId={bookingId} />}
    </div>
  );
};

export default CancelBookingLayout;
