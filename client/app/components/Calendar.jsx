import styles from "../../styles/components/Calendar.module.css";

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

  const allDays = [...prevMonthDays, ...monthDays, ...nextMonthDays];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.calendar}>
        <div className={styles.daysContainer}>
          {days.map((day, index) => (
            <p key={index} className={styles.day}>
              {day}
            </p>
          ))}
        </div>
        <div className={styles.grid}>
          {allDays.map((day, index) => (
            <p key={index} className={styles.cell}>
              {day}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
