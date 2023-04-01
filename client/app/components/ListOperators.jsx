import Link from "next/link";
import Button from "../commons/Button";
import styles from "../../styles/components/List.module.css";

const fetchOperators = () => {
  // Pendiente llamada al back para traer todos los operators
  /* return axios.get("https://localhost:5000/api/operators").then((res) => res.json()) */
  return [
    {
      id: 1,
      name: "Operador 1",
      mail: "operador1@test.com",
      dni: 24732129,
      branch: "Palermo",
      password: "hsfdu3aq1",
    },
    {
      id: 2,
      name: "Operador 2",
      mail: "operador2@test.com",
      dni: 56123894,
      branch: "Villa Crespo",
      password: "hsfserq124",
    },
  ];
};

export default async function ListOperators() {
  const operators = await fetchOperators();

  return (
    <>
      <h1 className={styles["list-title"]}>Operadores</h1>
      <div className={styles.list}>
        {operators.map((operator) => (
          <div key={operator.id} className={styles["list-item"]}>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Nombre</p>
              <p className={styles["list-content"]}>{operator.name}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Mail</p>
              <p className={styles["list-content"]}>{operator.mail}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>DNI</p>
              <p className={styles["list-content"]}>{operator.dni}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Sucursal</p>
              <p className={styles["list-content"]}>{operator.branch}</p>
            </div>
            <Link
              className={`${styles["list-column"]} w10`}
              href={`/operators/edit/${operator.id}`}>
              <Button className={"btn-secondary"} title={"Editar"} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
