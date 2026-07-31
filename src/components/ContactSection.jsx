import { useState } from "react";
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.open(`mailto:deepalij371@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  }

  return (
    <section className="block" id="contact">
      <Reveal>
        <SectionHead index="04" title="Contact" />
        <div className="contact-grid">
          {/* Contact info */}
          <div className="contact-info-card">
            <p className="lead">Open to Java developer roles and backend engineering opportunities.</p>
            <a className="contact-line" href="mailto:deepalij371@gmail.com">
              <Mail size={16} /> deepalij371@gmail.com
            </a>
            <a className="contact-line" href="tel:+917681816772">
              <Phone size={16} /> +91 7681816772
            </a>
            <a
              className="contact-line"
              href="https://www.linkedin.com/in/deepali-jena-59b677244"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} /> linkedin.com/in/deepali-jena
            </a>
            <a
              className="contact-line"
              href="https://github.com/deepalij371"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> github.com/deepalij371
            </a>
            <span className="contact-line">
              <MapPin size={16} /> Hyderabad, India
            </span>
          </div>

          {/* Contact form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">name</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message">message</label>
              <textarea
                id="message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Let's talk about..."
              />
            </div>
            <button className="submit-btn" type="submit">
              <Send size={15} /> Send message
            </button>
            {sent && (
              <span className="sent-note">// mail client opened — review and hit send</span>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
