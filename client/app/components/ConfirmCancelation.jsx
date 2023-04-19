import axios from "axios";
import styles from "../../styles/components/ConfirmCancelation.module.css";
import { useRouter } from "next/navigation";

const ConfirmCancelation = ({ bookingId, selectedReason }) => {
  const router = useRouter();

  const handleCancelation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { cancelReason: selectedReason }
      );
      if (response.status === 200) {
        router.push("/bookings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>Tu reserva actual será cancelada</p>
      <p className={styles.text}>La cancelación no puede ser revertida</p>
      <button
        className={`btn-primary ${styles["cancel-btn"]}`}
        onClick={handleCancelation}
        type="button">
        Confirmar cancelación
      </button>
    </div>
  );
};

export default ConfirmCancelation;
