"use client";
import { useState } from "react";
import styles from "../../styles/components/GeneralForm.module.css";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";

const startTimes = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
];
const endTimes = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const CreateBranchForm = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [startTime, setStartTime] = useState(startTimes[0]);
  const [endTime, setEndTime] = useState(endTimes[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await axios.post(
      "https://mi-turno-web-api.vercel.app/api/branches/create",
      {
        name,
        email,
        phone,
        maxCapacity,
        startTime,
        endTime,
      }
    );

    setLoading(false);

    if (response.status === 201) {
      setSuccess(true);
    }
  };

  return (
    <div className={styles.container} style={{ width: "64%" }}>
      <h1
        className={styles.title}
        style={{ textAlign: "left", fontSize: "20px" }}>
        Crear una nueva sucursal
      </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="input__field">
          <label className="input__label">Nombre</label>
          <input
            type="text"
            required
            className="input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input__field">
          <label className="input__label">Correo electrónico</label>
          <input
            type="email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label">Teléfono</label>
            <input
              type="tel"
              required
              className="input"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input__field">
            <label className="input__label">Capacidad máxima</label>
            <input
              type="number"
              min="1"
              max="10"
              required
              className="input"
              onChange={(e) => setMaxCapacity(e.target.value)}
            />
          </div>
        </div>
        <div className="input__rowContainer">
          <div className="input__field">
            <label className="input__label">Horario de inicio</label>
            <select
              type="text"
              required
              className="input"
              onChange={(e) => setStartTime(e.target.value)}>
              {startTimes.map((startTime, i) => (
                <option key={i} value={startTime}>
                  {startTime}
                </option>
              ))}
            </select>
          </div>
          <div className="input__field">
            <label className="input__label">Horario de cierre</label>
            <select
              type="text"
              required
              className="input"
              onChange={(e) => setEndTime(e.target.value)}>
              {endTimes.map((endTime, i) => (
                <option key={i} value={endTime}>
                  {endTime}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className={"btn-primary w100"}
          style={success ? { backgroundColor: "#00a541" } : {}}
          type="submit">
          {success ? (
            <AiOutlineCheckCircle
              style={{ color: "#fff", fontSize: "1.5rem" }}
            />
          ) : loading ? (
            <span className="spinner" />
          ) : (
            "Enviar"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBranchForm;
