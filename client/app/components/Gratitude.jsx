import styles from "../../styles/components/Gratitude.module.css";
import { BsCheckSquare } from "react-icons/bs";

const Gratitude = () => {
  return (
    <div className={styles.gratitude}>
      <BsCheckSquare className={styles.gratitude__icon} />
      <h1 className={styles.gratitude__title}>¡Gracias por tu reserva!</h1>
      <div className={styles.gratitude__text}>
        <p>
          En hasta 5 minutos, recibirás un correo electrónico en
          ivan@e-cruce.com con todos los detalles de tu reservación.
        </p>
        <p>Recordá revisar tu buzón de correo no deseado o promociones.</p>
      </div>

      <button className="btn-primary">¿Querés imprimir tu comprobante?</button>
    </div>
  );
};

export default Gratitude;
