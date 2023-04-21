"use client";
import Link from "next/link";
import styles from "../../styles/components/List.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ListBranches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://mi-turno-web-api.vercel.app/api/branches");
      setBranches(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["list-container"]}>
      <h1 className={styles["list-title"]}>Sucursales</h1>
      <div className={styles.list}>
        {branches.map((branch) => (
          <div key={branch.id} className={styles["list-item"]}>
            <div className={styles["list-pair"]}>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>Nombre</p>
                <p className={styles["list-content"]}>{branch.name}</p>
              </div>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>Mail</p>
                <p className={styles["list-content"]}>{branch.email}</p>
              </div>
            </div>
            <div className={styles["list-pair"]}>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>Capacidad máxima</p>
                <p className={styles["list-content"]}>{branch.maxCapacity}</p>
              </div>
              <div className={`${styles["list-field"]} w22-5`}>
                <p className={styles["list-label"]}>
                  Horario de inicio y cierre
                </p>
                <p className={styles["list-content"]}>
                  {branch.startTime} - {branch.endTime}
                </p>
              </div>
            </div>
            <div className={styles["list-button"]}>
              <Link href={`/branches/edit?id=${branch.id}`}>
                <button className={"btn-tertiary"}>Editar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBranches;
