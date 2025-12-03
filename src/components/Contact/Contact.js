import React, { useState } from "react";
import Parse from "../../parseConfig";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ----------------------------
      // 1. Save to Parse
      // ----------------------------
      const ContactMessage = Parse.Object.extend("ContactMessage");
      const msg = new ContactMessage();

      msg.set("name", form.name);
      msg.set("email", form.email);
      msg.set("subject", form.subject);
      msg.set("message", form.message);

      const user = Parse.User.current();
      if (user) msg.set("user", user);

      await msg.save();

      // ----------------------------
      // 2. Send email through API
      // ----------------------------
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Email API error:", await res.text());
        throw new Error("Email failed to send");
      }

      // Success Message
      alert("Message sent! We’ll get back to you soon.");

      // Reset form
      setForm({
        name: "",
        email: "",
        subject: "General",
        message: "",
      });

    } catch (err) {
      console.error("Contact form error:", err);
      alert("Something went wrong — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <h2>Contact Us</h2>
          <p className={styles.contactInfo}>
            Email: <a href="mailto:ndski@nd.edu">ndski@nd.edu</a>
          </p>
          <p className={styles.contactInfo}>
            Instagram:{" "}
            <a href="https://www.instagram.com/ndskiclub/"
               target="_blank" rel="noreferrer">
              @ndskiclub
            </a>
          </p>
          <p className={styles.contactInfo}>
            GroupMe:{" "}
            <a href="https://groupme.com/join_group/96582520/YCi5xE1y"
               target="_blank" rel="noreferrer">
              Ski Events
            </a>
          </p>
        </div>

        <div className={styles.contactFormContainer}>
          <h3>Send a Message</h3>

          <form className={styles.contactForm} onSubmit={onSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              inputMode="email"
              placeholder="name@nd.edu"
            />

            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={onChange}
            >
              <option>General</option>
              <option>Racing</option>
              <option>Trips</option>
              <option>Membership</option>
            </select>

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={onChange}
              required
            />

            <input
              type="submit"
              value={loading ? "Sending..." : "Send"}
              disabled={loading}
              aria-label="Send message"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
