"use client";
import { useSelector } from "react-redux";
import styles from "../../styles/components/List.module.css";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const ListBookings = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const url =
        user.role === "client"
          ? `http://localhost:5000/api/bookings/user/${user.id}`
          : "http://localhost:5000/api/bookings";

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

  return (
    <div className={styles["list-container"]}>
      <h1 className={styles["list-title"]}>Reservas</h1>
      <div className={styles.list}>
        {bookings.map((booking) => (
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
                <p className={styles["list-label"]}>Sucursal</p>
                <p className={styles["list-content"]}>
                  {getBranchName(booking.branch)}
                </p>
              </div>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>N° de la reserva</p>
                <p className={styles["list-content"]}>{booking.number}</p>
              </div>
            </div>
            <div className={styles["list-button"]}>
              <Link href={`/bookings/cancel?id=${booking.id}`}>
                <button className="btn-tertiary btn-error">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBookings;
