"use client";
import { useState } from "react";
import Cards from "../components/Cards";
import styles from "../../styles/reports/Reports.module.css";

const branches = ["Balvanera", "Nuñez", "Palermo", "Recoleta", "Villa Crespo"];

export default function ReportsPage() {
  const [branch, setBranch] = useState("");

  const handleChange = (e) => {
    setBranch(e.target.value);
  };

  return (
    <section className="section bg-grey2">
      <div className={styles.report}>
        <div className="w33">
          <p> Filtro por Sucursal</p>
          <select
            className="input"
            name="branch"
            defaultValue=""
            onChange={handleChange}
          >
            {branches.map((branch, i) => (
              <option key={i} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>
        <Cards branch={branch} />
      </div>
    </section>
  );
}
