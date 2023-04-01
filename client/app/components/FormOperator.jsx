"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "../commons/Button";
import styles from "../../styles/components/Form.module.css";

const branches = ["Balvanera", "Nuñez", "Palermo", "Recoleta", "Villa Crespo"];

export default function FormOperator({ operator = null, newOperator = true }) {
  const [form, setForm] = useState(operator);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newOperator) {
      // Pendiente llamada al back para crear nuevo operador
      // return axios.post(`https://localhost:5000/api/operators/create`).then((res) => res.json())
      console.log("agregar");
    } else {
      // Pendiente llamada al back para traer todos los operators
      // return axios.put(`https://localhost:5000/api/operators/edit/{operator.id}`).then((res) => res.json())
      console.log("editar");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles["form-title"]}>
        {newOperator ? "Crear un nuevo operador" : "Editar operador"}
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
          <label className={styles["form-label"]}>DNI</label>
          <input
            className="input w100"
            required
            type="text"
            autoComplete="off"
            name="dni"
            value={form ? form.dni : ""}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles["form-input-group"]} w50`}>
          <label className={styles["form-label"]}>Sucursal</label>
          <select
            className="input w100"
            name="branch"
            value={form ? form.branches : ""}
            onChange={handleChange}>
            {branches.map((branch, i) => (
              <option key={i} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles["form-row"]}>
        <div
          className={
            newOperator
              ? `${styles["form-input-group"]} w50`
              : `${styles["form-input-group"]} w100`
          }>
          <label className={styles["form-label"]}>Contraseña</label>
          <input
            className="input w100"
            required
            type="password"
            autoComplete="off"
            name="password"
            value={form ? form.password : ""}
            onChange={handleChange}
          />
        </div>
        {newOperator ? (
          <div className={`${styles["form-input-group"]} w50`}>
            <label className={styles["form-label"]}>Repetir contraseña</label>
            <input
              className="input w100"
              required
              type="password"
              autoComplete="off"
              name="passwordRep"
              value={form ? form.password : ""}
              onChange={handleChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <Button
        className={"btn-primary w100"}
        title={newOperator ? "Agregar" : "Editar"}
        type="submit"
      />
      <Link className="w100" href="/operators">
        <Button className={"btn-tertiary w100"} title={"Volver"} />
      </Link>
    </form>
  );
}
