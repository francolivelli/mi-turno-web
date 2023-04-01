import { BsXSquare } from "react-icons/bs";
import styles from "../../styles/components/Alert.module.css";

const ErrorAlert = () => {
  return (
    <div className={styles.alert}>
      <BsXSquare
        className={`${styles["alert__icon"]} ${styles["alert__icon--error"]}`}
      />
      <div className={styles.alert__textarea}>
        <h1 className={styles.alert__title}>No se pudo realizar el cambio</h1>
        <p className={styles.alert__message}>
          Este turno ya fue ocupado, vuelve a intentarlo más tarde o modificando
          algún parámetro
        </p>
      </div>
      <button className="btn-primary alert__button">Volver a intentar</button>
    </div>
  );
};

export default ErrorAlert;
