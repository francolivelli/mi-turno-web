"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../commons/Button";
import styles from "../../styles/components/Form.module.css";

const startTimes = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00"];
const endTimes = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];

export default function FormBranch({ branch = null, newMovie = true }) {
  const router = useRouter();
  const [form, setForm] = useState(branch);

  useEffect(() => {
    if (branch && branch.status) {
      // pendiente un pop up
      alert("Error. No se encontró la información de la sucursal");
      router.back();
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMovie) {
      fetch(`http://localhost:5000/api/branch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then(() => {
        // pendiente pop up
        alert("Sucursal creada con éxito");
        router.back();
      });
    } else {
      fetch(`http://localhost:5000/api/branch/${branch.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then(() => {
        // pendiente pop up
        alert("Sucursal modificada con éxito");
        router.back();
      });
    }
  };

  return !branch || !branch.status ? (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles["form-title"]}>
        {newMovie ? "Crear una nueva sucursal" : "Editar sucursal"}
      </h2>
      <div className={`${styles["form-input-group"]} w100`}>
        <label className={styles["form-label"]}>Nombre</label>
        <input
          className="input w100"
          required
          type="text"
          autoComplete="off"
          name="name"
          value={form ? form.name : ""}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles["form-input-group"]} w100`}>
        <label className={styles["form-label"]}>Correo electrónico</label>
        <input
          className="input w100"
          required
          type="email"
          autoComplete="off"
          name="mail"
          value={form ? form.mail : ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles["form-row"]}>
        <div className={`${styles["form-input-group"]} w50`}>
          <label className={styles["form-label"]}>Teléfono</label>
          <input
            className="input w100"
            required
            type="tel"
            autoComplete="off"
            name="phone"
            value={form ? form.phone : ""}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles["form-input-group"]} w50`}>
          <label className={styles["form-label"]}>Capacidad máxima</label>
          <input
            className="input w100"
            required
            type="number"
            autoComplete="off"
            name="maxShifts"
            value={form ? form.maxShifts : 1}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div className={`${styles["form-input-group"]} w50`}>
          <label className={styles["form-label"]}>Horario de Inicio</label>
          <select
            className="input w100"
            required
            name="startTime"
            value={form ? form.startTime : ""}
            onChange={handleChange}>
            {startTimes.map((startTime, i) => (
              <option key={i} value={startTime}>
                {startTime}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles["form-input-group"]} w50`}>
          <label className={styles["form-label"]}>Horario de Cierre</label>
          <select
            className="input w100"
            required
            name="endTime"
            value={form ? form.endTime : ""}
            onChange={handleChange}>
            {endTimes.map((endTime, i) => (
              <option key={i} value={endTime}>
                {endTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        className={"btn-primary w100"}
        title={newMovie ? "Agregar" : "Editar"}
        type="submit"
      />
      <Link className="w100" href="/branches">
        <Button className={"btn-tertiary w100"} title={"Volver"} />
      </Link>
    </form>
  ) : (
    ""
  );
}
