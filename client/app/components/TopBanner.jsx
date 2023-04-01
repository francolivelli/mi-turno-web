"use client";
import styles from "../../styles/components/TopBanner.module.css";
import { MdClose } from "react-icons/md";
import { useState } from "react";

const TopBanner = () => {
  const [openTopBanner, setOpenTopBanner] = useState(true);

  const handleClose = () => setOpenTopBanner(false);

  return (
    <>
      {openTopBanner && (
        <div className={styles.banner}>
          <p className={`link ${styles.text}`}>Mensaje promocional</p>
          <MdClose className={styles.close} onClick={handleClose} />
        </div>
      )}
    </>
  );
};

export default TopBanner;
