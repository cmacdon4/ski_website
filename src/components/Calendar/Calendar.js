import React from "react";
import styles from "./Calendar.module.css";


export default function Calendar() {
  return (
    <main className={styles.calendarContainer}>
      <h1 className={styles.title}>Club Ski Team Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_b207d236ce90711064b27043ca7c403f37b872348ef12f4151fbc54c3ee047f8%40group.calendar.google.com&ctz=America%2FIndiana%2FIndianapolis"
        className={styles.calendarFrame}
        title="ND Ski Team Calendar"
        scrolling="no"
      ></iframe>
    </main>
  );
}
