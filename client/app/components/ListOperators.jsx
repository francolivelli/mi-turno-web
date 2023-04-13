"use client";
import Link from "next/link";
import styles from "../../styles/components/List.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ListOperators = () => {
  const [operators, setOperators] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/api/users");
      const branches = await axios.get("http://localhost:5000/api/branches");
      setOperators(response.data);
      setBranches(branches.data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["list-container"]}>
      <h1 className={styles["list-title"]}>Operadores</h1>
      <div className={styles.list}>
        {operators.map((operator) => (
          <div key={operator.id} className={styles["list-item"]}>
            <div className={styles["list-pair"]}>
              <div className={styles["list-field"]}>
                <p className={styles["list-label"]}>Nombre</p>
                <p className={styles["list-content"]}>{operator.name}</p>
              </div>
              <div className={styles["list-field"]}>
                <p className={styles["list-label"]}>Mail</p>
                <p className={styles["list-content"]}>{operator.email}</p>
              </div>
            </div>
            <div className={styles["list-pair"]}>
              <div className={styles["list-field"]}>
                <p className={styles["list-label"]}>DNI</p>
                <p className={styles["list-content"]}>{operator.dni}</p>
              </div>
              <div className={styles["list-field"]}>
                <p className={styles["list-label"]}>Sucursal</p>
                <p className={styles["list-content"]}>
                  {branches.find((branch) => branch.id === operator.branch)
                    ?.name || "Sin sucursal asignada"}
                </p>
              </div>
            </div>
            <div className={styles["list-button"]}>
              <Link href={`/operators/edit?id=${operator.id}`}>
                <button className={"btn-tertiary"}>Editar</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOperators;
