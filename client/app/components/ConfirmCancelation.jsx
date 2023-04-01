import styles from "../../styles/components/ConfirmCancelation.module.css";

const ConfirmCancelation = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Su reserva actual será cancelada</p>
      <p className={styles.text}>La cancelación no puede ser revertida</p>
      <button className={`btn-primary ${styles["cancel-btn"]}`}>
        Confirmar cancelación
      </button>
    </div>
  );
};

export default ConfirmCancelation;
