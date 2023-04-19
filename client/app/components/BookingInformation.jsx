import axios from "axios";
import styles from "../../styles/components/BookingInformation.module.css";
import { useEffect, useState } from "react";

const BookingInformation = ({ bookingId }) => {
  const [bookingData, setBookingData] = useState(null);
  const [branchData, setBranchData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bookings/${bookingId}`)
      .then((response) => {
        setBookingData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookingId]);

  useEffect(() => {
    if (bookingData) {
      axios
        .get(`http://localhost:5000/api/branches/${bookingData.branch}`)
        .then((response) => {
          setBranchData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [bookingData]);

  if (!bookingData || !branchData) {
    return <p>Cargando...</p>;
  }

  const { name, date, time } = bookingData;

  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        <p className={styles.heading}>Infomación de la reserva</p>
        <h3 className={styles.user}>{name}</h3>
      </div>
      <div className={styles["inner-container"]}>
        <p className={styles.body}>
          <span>Día:</span> {date}
        </p>
        <p className={styles.body}>
          <span>Horario:</span> {time} hs
        </p>
        <p className={styles.body}>
          <span>Sucursal:</span> {branchData.name}
        </p>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default BookingInformation;
