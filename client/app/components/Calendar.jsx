import React from "react";
import styles from "../../styles/components/Calendar.module.css";

function Calendar() {
  return (
    <div className={styles.cajaCalendar}>
      <h1 className={styles.titulo}>Marzo 2024</h1>
      <div className={styles.filas}>
        <li className={styles.nombreDia}>Lun</li>
        <li className={styles.nombreDia}>Mar</li>
        <li className={styles.nombreDia}>Mie</li>
        <li className={styles.nombreDia}>Jue</li>
        <li className={styles.nombreDia}>Vie</li>
        <li className={styles.nombreDia}>Sad</li>
        <li className={styles.nombreDia}>Dom</li>
        <div className={styles.cajaDia}>
          <li className={styles.primerDia}>1</li>
        </div>
        <div className={styles.cajaDia}>
          <li>2</li>
        </div>
        <div className={styles.cajaDia}>
          <li>3</li>
        </div>
        <div className={styles.cajaDia}>
          <li>4</li>
        </div>
        <div className={styles.cajaDia}>
          <li>5</li>
        </div>
        <div className={styles.cajaDia}>
          <li>6</li>
        </div>
        <div className={styles.cajaDia}>
          <li>7</li>
        </div>
        <div className={styles.cajaDia}>
          <li>8</li>
        </div>
        <div className={styles.cajaDia}>
          <li>9</li>
        </div>
        <div className={styles.cajaDia}>
          <li>10</li>
        </div>
        <div className={styles.cajaDia}>
          <li>11</li>
        </div>
        <div className={styles.cajaDia}>
          <li>12</li>
        </div>
        <div className={styles.cajaDia}>
          <li>13</li>
        </div>
        <div className={styles.cajaDia}>
          <li>14</li>
        </div>
        <div className={styles.cajaDia}>
          <li>15</li>
        </div>
        <div className={styles.cajaDia}>
          <li>16</li>
        </div>
        <div className={styles.cajaDia}>
          <li>17</li>
        </div>
        <div className={styles.cajaDia}>
          <li>18</li>
        </div>
        <div className={styles.cajaDia}>
          <li>19</li>
        </div>
        <div className={styles.cajaDia}>
          <li>20</li>
        </div>
        <div className={styles.cajaDia}>
          <li>21</li>
        </div>
        <div className={styles.cajaDia}>
          <li>22</li>
        </div>
        <div className={styles.cajaDia}>
          <li>23</li>
        </div>
        <div className={styles.cajaDia}>
          <li>24</li>
        </div>
        <div className={styles.cajaDia}>
          <li>25</li>
        </div>
        <div className={styles.cajaDia}>
          <li>26</li>
        </div>
        <div className={styles.cajaDia}>
          <li>27</li>
        </div>
        <div className={styles.cajaDia}>
          <li>28</li>
        </div>
        <div className={styles.cajaDia}>
          <li>29</li>
        </div>
        <div className={styles.cajaDia}>
          <li>30</li>
        </div>
        <div className={styles.cajaDia}>
          <li>31</li>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
