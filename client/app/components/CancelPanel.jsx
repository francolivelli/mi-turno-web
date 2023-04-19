"use client";
import { useRouter } from "next/navigation";
import styles from "../../styles/components/CancelPanel.module.css";
import ConfirmCancelation from "./ConfirmCancelation";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useState } from "react";

const CancelPanel = ({ bookingId }) => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const [selectedReason, setSelectedReason] = useState(null);

  const handleInputChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const checkboxData = [
    { id: 1, text: "Ya no quiero ir" },
    { id: 2, text: "Me equivoqué de horario" },
    { id: 3, text: "Encontré un lugar mejor" },
    { id: 4, text: "Me cancelaron" },
    { id: 5, text: "Otro" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className={`${styles.back} link`}
        onClick={() => router.back()}
        style={{ marginTop: "-1.5rem", marginBottom: "0.5rem" }}>
        <MdArrowBack />
        <p>Atrás</p>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Cancelar reserva</h1>
        <div className={styles.header}>
          <p className={styles.greeting}>Hola {user.name.split(" ")[0]},</p>
          <p className={styles.question}>
            ¿Por qué deseás cancelar tu reserva?
          </p>
        </div>
        <form className={styles.form}>
          {checkboxData.map((checkbox) => {
            return (
              <div key={checkbox.id}>
                <hr className={styles.divider} />
                <div className="checkbox-container" >
                  <input
                    type="radio"
                    name="cancelReason"
                    id={checkbox.id}
                    value={checkbox.text}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={checkbox.id}>{checkbox.text}</label>
                </div>
                {selectedReason === checkbox.text && (
                  <ConfirmCancelation
                    bookingId={bookingId}
                    selectedReason={selectedReason}
                  />
                )}
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

export default CancelPanel;
