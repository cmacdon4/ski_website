import React, { useState } from "react"; // useState hook for form state management
import styles from "./Contact.module.css"; // CSS modules for component styling

export default function Contact() {
  // Form state object to track all input values
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    subject: "General",
  });

  // Generic handler to update form state when inputs change
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission with basic validation
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    alert(
      `Thanks, ${form.name}! We received your message about "${form.subject}".\n\n${form.message}`
    );
  };

  return (
    <main>
      <div className={styles.contactGrid}> {/* Two-column layout container */}
        <div className={styles.contactCard}> {/* Left column: contact information */}
          <h2>Contact Us</h2>
          <p className={styles.contactInfo}> {/* Email contact link */}
            Email: <a href="mailto:ndski@nd.edu">ndski@nd.edu</a>
          </p>
          <p className={styles.contactInfo}> {/* Instagram social link */}
            Instagram:{" "}
            <a
              href="https://www.instagram.com/ndskiclub/"
              target="_blank"
              rel="noreferrer"
            >
              @ndskiclub
            </a>
          </p>
          <p className={styles.contactInfo}> {/* Placeholder for GroupMe link */}
            GroupMe: {" "}
            <a
              href="https://groupme.com/join_group/96582520/YCi5xE1y"
              target="_blank"
              rel="noreferrer"
            >
              Ski Events
            </a>
          </p>
        </div>

        <div className={styles.contactFormContainer}> {/* Right column: contact form */}
          <h3>Send a Message</h3>
          <form className={styles.contactForm} onSubmit={onSubmit} noValidate> {/* Contact form with validation */}
            <label htmlFor="name">Name</label> {/* Name input field */}
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />

            <label htmlFor="email">Email</label> {/* Email input field */}
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

            <label htmlFor="subject">Subject</label> {/* Subject dropdown */}
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

            <label htmlFor="message">Message</label> {/* Message textarea */}
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={onChange}
              required
            />

            <input type="submit" value="Send" aria-label="Send message" /> {/* Submit button */}
          </form>
        </div>
      </div>
    </main>
  );
}
