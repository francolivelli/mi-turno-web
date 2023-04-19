"use client";
import styles from "../../styles/components/BookingResume.module.css";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const BookingResume = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState(null);
  const [branch, setBranch] = useState(null);
  const router = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    const getBooking = async () => {
      const booking = await axios.get(
        `http://localhost:5000/api/bookings/${bookingId}`
      );
      setBooking(booking.data);
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
    return <div></div>;
  }

  if (!branch) {
    return <div></div>;
  }

  const createdAtDate = new Date(booking.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("es-AR");
  const formattedTime = createdAtDate.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCancel = async () => {
    router.push(`/bookings/cancel?id=${bookingId}`);
  };

  return (
    <div className={styles.container}>
      <hr className={styles.divider} />
      <div className={styles.booking}>
        <div className={styles.booking__header}>
          <h1 className={styles.booking__title}>
            Reserva{" "}
            <span className={styles.booking__number}>#{booking.number}</span>
          </h1>
          <p className={styles.booking__info}>
            Hecho el {formattedDate} a las {formattedTime} hs para el{" "}
            {booking.date} a las {booking.time} hs
          </p>
        </div>
        <div className={styles.booking__details}>
          <div className={styles.booking__resume}>
            <h3 className={styles.booking__subtitle}>{booking.name}</h3>
            <div className={styles.booking__values}>
              <p className={styles.booking__key}>
                <span className={styles.booking__value}>Mail:</span>{" "}
                {booking.email}
              </p>
              <p className={styles.booking__key}>
                <span className={styles.booking__value}>Teléfono:</span>{" "}
                {booking.phone}
              </p>
            </div>
          </div>
          <div className={styles.booking__resume}>
            <h3 className={styles.booking__subtitle}>Reserva</h3>
            <div className={styles.booking__values}>
              <p className={styles.booking__key}>
                <span className={styles.booking__value}>Sucursal:</span>{" "}
                {branch.name}
              </p>
              <p className={styles.booking__key}>
                <span className={styles.booking__value}>Horario:</span>{" "}
                {booking.time} hs
              </p>
            </div>
          </div>
        </div>
        <div className={styles.booking__buttons}>
          <button
            className={"btn-tertiary btn-error"}
            onClick={handleCancel}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
              <CgClose /> <p>Cancelar Reserva</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingResume;
