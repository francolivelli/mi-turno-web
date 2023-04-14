"use client";
import styles from "../../styles/components/Calendar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../features/dateSlice";
import { useEffect, useState } from "react";
import { setCurrentStep } from "../features/stepSlice";

const Calendar = () => {
  // Creamos un objeto Date con la fecha actual
  const currentDate = new Date();

  // Obtenemos el nombre del mes y el año actual
  const currentMonth = currentDate
    .toLocaleString("es-AR", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());
  const currentYear = currentDate.getFullYear();

  // Creamos el título con el mes y el año actual
  const title = `${currentMonth} ${currentYear}`;

  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  // Obtenemos la cantidad de días del mes actual
  const numDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Obtenemos el día de la semana en que comienza el mes actual (0: domingo, 1: lunes, etc.)
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Creamos un arreglo con los días del mes en curso
  const monthDays = Array.from({ length: numDays }, (_, i) => i + 1);

  // Agregamos los días del mes anterior para completar la primera semana
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) =>
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - i).getDate()
  ).reverse();

  // Obtenemos el día de la semana en que termina el mes actual (0: domingo, 1: lunes, etc.)
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDay();

  // Agregamos los días del mes siguiente para completar la última semana
  const nextMonthDays = Array.from({ length: 6 - lastDay }, (_, i) => i + 1);

  const step = useSelector((state) => state.step.currentStep);

  const dispatch = useDispatch();

  const [initialSelectedCell, setInitialSelectedCell] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    if (step === 1) {
      setSelectedCell(null);
      setInitialSelectedCell(null);
    }
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      setSelectedCell(initialSelectedCell);
    }
  }, [step]);

  return (
    <div className={styles.container}>
      <h2 className={step > 1 ? styles.activeTitle : styles.title}>{title}</h2>
      <div className={styles.calendar}>
        <div className={styles.daysContainer}>
          {days.map((day, index) => (
            <p key={index} className={step > 1 ? styles.activeDay : styles.day}>
              {day}
            </p>
          ))}
        </div>
        <div className={styles.grid}>
          {prevMonthDays.map((day, index) => (
            <div key={index} className={styles.cell}>
              {day}
            </div>
          ))}
          {monthDays.map((day, index) => {
            const cellClass = step > 1 ? styles.activeCell : styles.cell;
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const formattedDate = date.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            if (date.getDay() === 0) {
              return (
                <div key={index} className={styles.cell}>
                  {day}
                </div>
              );
            } else {
              const isSelected = formattedDate === selectedCell;
              const className = isSelected
                ? `${cellClass} ${styles.selectedCell}`
                : cellClass;
              const onClickFunction =
                step > 1
                  ? () => {
                      dispatch(setDate({ date: formattedDate }));
                      dispatch(setCurrentStep(3));
                      setSelectedCell(formattedDate);
                    }
                  : null;
              return (
                <div
                  key={index}
                  className={className}
                  onClick={onClickFunction}>
                  {day}
                </div>
              );
            }
          })}
          {nextMonthDays.map((day, index) => (
            <div key={index} className={styles.cell}>
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
