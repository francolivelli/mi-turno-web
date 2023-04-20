"use client";
import { useSelector } from "react-redux";
import styles from "../../styles/components/List.module.css";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";

const ListBookings = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [branches, setBranches] = useState([]);
  const [attendance, setAttendance] = useState(undefined);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleConfirmationChange = async (event, index, bookingId) => {
    setAttendance(event.target.value);
    setSelectedIndex(index);

    try {
      await axios.put(
        `http://localhost:5000/api/bookings/attendance/${bookingId}`,
        { attendance }
      );
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const url =
        user.role === "client"
          ? `http://localhost:5000/api/bookings/user/${user.id}`
          : user.role === "operator"
          ? `http://localhost:5000/api/bookings/branch/${user.branch}`
          : null;

      try {
        const response = await axios.get(url);
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBranches = async () => {
      const response = await axios.get("http://localhost:5000/api/branches");
      setBranches(response.data);
    };

    fetchBookings();
    fetchBranches();
  }, [user]);

  const getBranchName = (branchId) => {
    const branch = branches.find((branch) => branch.id === branchId);
    return branch ? branch.name : "";
  };

  const isCancellationDisabled = (booking) => {
    const now = moment();
    const bookingTime = moment(
      `${booking.date} ${booking.time}`,
      "DD/MM/YYYY HH:mm"
    );
    const diffInMinutes = bookingTime.diff(now, "minutes");
    return diffInMinutes < 30;
  };

  return (
    <div className={styles["list-container"]}>
      <h1 className={styles["list-title"]}>Reservas</h1>
      <div className={styles.list}>
        {bookings.map((booking, index) => (
          <div key={booking.id} className={styles["list-item"]}>
            <div className={styles["list-pair"]}>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>Nombre y Apellido</p>
                <p className={styles["list-content"]}>{booking.name}</p>
              </div>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>Reserva</p>
                <p className={styles["list-content"]}>
                  {booking.date} - {booking.time} hs
                </p>
              </div>
            </div>
            <div className={styles["list-pair"]}>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>
                  {user.role === "client" ? "Sucursal" : "Día de la reserva"}
                </p>
                <p className={styles["list-content"]}>
                  {user.role === "client"
                    ? getBranchName(booking.branch)
                    : moment(booking.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>N° de la reserva</p>
                <p className={styles["list-content"]}>{booking.number}</p>
              </div>
            </div>
            <div className={styles["list-button"]}>
              {user.role === "client" ? (
                <Link href={`/bookings/cancel?id=${booking.id}`}>
                  <button
                    className="btn-tertiary btn-error"
                    disabled={isCancellationDisabled}>
                    Cancelar
                  </button>
                </Link>
              ) : (
                <select
                  className={
                    selectedIndex === index
                      ? attendance === "true"
                        ? "btn-tertiary btn-success"
                        : "btn-tertiary btn-error"
                      : "btn-tertiary"
                  }
                  onChange={(event) =>
                    handleConfirmationChange(event, index, booking.id)
                  }
                  defaultValue="">
                  <option value="">Confirmación</option>
                  <option value={true} style={{ color: "black" }}>
                    Asistió
                  </option>
                  <option value={false} style={{ color: "black" }}>
                    No asistió
                  </option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBookings;
