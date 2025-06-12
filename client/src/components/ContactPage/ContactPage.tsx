import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ContactPage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fade-in-section"
    >
      {children}
    </motion.div>
  );
};

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <p>Have any questions? We're here to help you.</p>
      </section>

      <div className="about-container">
        <FadeInSection>
          <section className="desc">
            <p>
              Whether you're curious about features, a free trial, or even
              press—we’re ready to answer any and all questions. Reach out and
              we’ll get back to you as soon as possible.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="contact-details">
            <h2>Reach Out</h2>
            <div className="cards-row">
              <div className="contact-card">
                <h3>Email</h3>
                <p>fitwelive@gmail.com</p>
              </div>
              <div className="contact-card">
                <h3>Phone</h3>
                <p>+91 89602 90646</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="cta">
            <h2>Get Started with Us Today</h2>
            <p>
              Take the first step towards a healthier, happier life with
              FitWeLive. Our team is ready to support you!
            </p>
            <button onClick={() => navigate("/enroll")}>
              Start Your Journey
            </button>
          </section>
        </FadeInSection>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
