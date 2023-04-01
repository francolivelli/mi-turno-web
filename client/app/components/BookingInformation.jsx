import styles from "../../styles/components/BookingInformation.module.css";

const BookingInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        <p className={styles.heading}>Infomación de la reserva</p>
        <h3 className={styles.user}>Ivan Cruce</h3>
      </div>
      <div className={styles["inner-container"]}>
        <p className={styles.body}>
          <span>Día:</span> 12/10/2022
        </p>
        <p className={styles.body}>
          <span>Horario:</span> 13:00 hs
        </p>
        <p className={styles.body}>
          <span>Sucursal:</span> Villa Crespo
        </p>
      </div>
      <hr className={styles.divider} />
    </div>
  );
};

export default BookingInformation;
