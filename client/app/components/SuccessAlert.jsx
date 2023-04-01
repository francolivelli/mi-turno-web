import { BsCheckSquare } from "react-icons/bs";
import styles from "../../styles/components/Alert.module.css";

const SuccessAlert = () => {
  return (
    <div className={styles.alert}>
      <BsCheckSquare
        className={`${styles["alert__icon"]} ${styles["alert__icon--success"]}`}
      />
      <div className={styles.alert__textarea}>
        <h1 className={styles.alert__title}>Turno reservado con éxito</h1>
        <p className={styles.alert__message}>
          Gracias por confiar en nuestro servicio
        </p>
      </div>
      <button className="btn-primary alert__button">Continuar</button>
    </div>
  );
};

export default SuccessAlert;
