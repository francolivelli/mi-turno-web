import styles from "../../styles/components/CreateBookingLayout.module.css";
import BookingPanel from "./BookingPanel";
import Calendar from "./Calendar";

const CreateBookingLayout = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hacer una reserva</h1>
      <div className={styles.components}>
        <BookingPanel />
        <Calendar />
      </div>
    </div>
  );
};

export default CreateBookingLayout;
