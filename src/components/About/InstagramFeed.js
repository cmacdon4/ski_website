import { useEffect } from "react";
import styles from "./InstagramFeed.module.css";

export default function InstagramFeed() {
  useEffect(() => {
    // Prevent duplicate script injections
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Follow Us on Instagram</h2>
      <div
        className="elfsight-app-c99a931a-6464-4405-9707-469cacd363ec"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}
