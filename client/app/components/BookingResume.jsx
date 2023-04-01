import styles from "../../styles/components/BookingResume.module.css";
import { FiTool } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

const BookingResume = () => {
  return (
    <>
      <hr className={styles.divider} />
      <div className={styles.booking}>
        <div className={styles.booking__header}>
          <h1 className={styles.booking__title}>
            Reserva{" "}
            <span className={styles.booking__number}>#1043812955480-01</span>
          </h1>
          <p className={styles.booking__info}>
            Hecho el 10/10/2022 a las 11:35 hs para el 12/10/2022 a las 13:00 hs
          </p>
        </div>
        <div className={styles.booking__details}>
          <div className={styles.booking__user}>
            <h3 className={styles.booking__subtitle}>Ivan Cruce</h3>
            <p className={styles.booking__value}>
              <span className={styles.booking__key}>Mail:</span>{" "}
              ivan@e-cruce.com
            </p>
            <p className={styles.booking__value}>
              <span className={styles.booking__key}>Teléfono:</span> 1123456789
            </p>
          </div>
          <div className={styles.booking_resume}>
            <h3 className={styles.booking__subtitle}>Reserva</h3>
            <p className={styles.booking__value}>
              <span className={styles.booking__key}>Sucursal:</span> Villa
              Crespo
            </p>
            <p className={styles.booking__value}>
              <span className={styles.booking__key}>Horario:</span> 13:00 hs
            </p>
          </div>
        </div>
        <div className={styles.booking__buttons}>
          <button className={`btn-secondary ${styles.booking__button}`}>
            <FiTool /> Editar Reserva
          </button>
          <button
            className={`btn-tertiary ${styles["booking__button--cancel"]}`}>
            <CgClose /> Cancelar Reserva
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingResume;
