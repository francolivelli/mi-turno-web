import Link from "next/link";
import Button from "../commons/Button";
import styles from "../../styles/components/List.module.css";

export default async function ListBranches() {

  return (
    <>
      <h1 className={styles["list-title"]}>Sucursales</h1>
      <div className={styles.list}>
        {branches.map((branch) => (
          <div key={branch.id} className={styles["list-item"]}>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Nombre</p>
              <p className={styles["list-content"]}>{branch.name}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Mail</p>
              <p className={styles["list-content"]}>{branch.mail}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Capacidad máxima</p>
              <p className={styles["list-content"]}>{branch.maxShifts}</p>
            </div>
            <div className={`${styles["list-column"]} w22-5`}>
              <p className={styles["list-label"]}>Horario de Inicio y Cierre</p>
              <p className={styles["list-content"]}>
                {branch.startTime} - {branch.endTime}
              </p>
            </div>
            <Link
              className={`${styles["list-column"]} w10`}
              href={`/branches/edit/${branch.id}`}>
              <Button className={"btn-secondary"} title={"Editar"} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
