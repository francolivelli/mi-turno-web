import React from "react";
import styles from "../../styles/components/BookingConfirmationPopUp.module.css";
import { BsCheckSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";

const BookingConfirmationPopUp = ({bookingId}) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/bookings/confirmation?id=${bookingId}`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <BsCheckSquare className={styles.icon} />
        <div className={styles.texts}>
          <div className={styles.title}>Turno reservado con éxito</div>
          <div className={styles.text}>
            Gracias por confiar en nuestro servicio
          </div>
        </div>
        <button className="btn-primary w100" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationPopUp;
