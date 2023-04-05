import { useRouter } from "next/navigation";
import styles from "../../styles/components/GeneralForm.module.css";
import React from "react";

const InvalidToken = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Solicitud inválida</h1>
      <button
        className={"btn-primary"}
        onClick={() => router.push("/forgot-password")}>
        Volver a intentar
      </button>
    </div>
  );
};

export default InvalidToken;
