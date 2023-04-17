"use client";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/components/Gratitude.module.css";
import { BsCheckSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const Gratitude = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState(null);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${bookingId}`
      );
      setBooking(response.data);
    };
    getBooking();
  }, [bookingId]);

  useEffect(() => {
    if (booking) {
      const getBranch = async () => {
        const branch = await axios.get(
          `http://localhost:5000/api/branches/${booking.branch}`
        );
        setBranch(branch.data);
      };
      getBranch();
    }
  }, [booking]);

  if (!booking) {
    return (
      <span
        className="spinner"
        style={{ alignSelf: "center", margin: "50px" }}
      />
    );
  }

  if (!branch) {
    return (
      <span
        className="spinner"
        style={{ alignSelf: "center", margin: "50px" }}
      />
    );
  }

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "cm",
      format: [12, 8],
      marginLeft: 1.5,
      marginTop: 1.5,
    });
    doc.text(`Reserva #${booking.number}`, 1.5, 1.5);
    doc.text(`Nombre: ${booking.name}`, 1.5, 2.5);
    doc.text(`Email: ${booking.email}`, 1.5, 3.5);
    doc.text(`Teléfono: ${booking.phone}`, 1.5, 4.5);
    doc.text(`Sucursal: ${branch.name}`, 1.5, 5.5);
    doc.text(`Fecha: ${booking.date} - ${booking.time} hs`, 1.5, 6.5);

    doc.save(`Reserva-${booking.number}.pdf`);
  };

  return (
    <div className={styles.gratitude}>
      <BsCheckSquare className={styles.gratitude__icon} />
      <h1 className={styles.gratitude__title}>¡Gracias por tu reserva!</h1>
      <div className={styles.gratitude__text}>
        <p>
          En hasta 5 minutos, recibirás un correo electrónico en {booking.email}{" "}
          con todos los detalles de tu reservación.
        </p>
        <p>Recordá revisar tu buzón de correo no deseado o promociones.</p>
      </div>

      <button className="btn-primary" onClick={handlePrint}>
        ¿Querés imprimir tu comprobante?
      </button>
    </div>
  );
};

export default Gratitude;
