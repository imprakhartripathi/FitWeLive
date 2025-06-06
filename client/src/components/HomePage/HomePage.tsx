import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./HomePage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import servicesData from "../../assets/services.json"

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

// ...imports remain the same

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <Navbar />

      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get Fit for Life with FitWeLive
        </motion.h1>
        <p>Your journey to a healthier, stronger you starts here.</p>
        <motion.button
          onClick={() => navigate("/enroll")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </section>

      <FadeInSection>
        <section className="who-we-are">
          <h2>Who We Are</h2>
          <p>
            At FitWeLive, fitness is not just a goal—it's a lifestyle. Our
            experienced trainers and wellness coaches guide you every step of
            the way.
          </p>
          <p>
            Every body is different. That’s why our plans are tailored uniquely
            to your goals, whether it’s fat loss, muscle gain, or full-body
            wellness.
          </p>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="what-we-do">
          <h2>What We Do</h2>
          <p>
            A complete ecosystem for your health: meal planning, training
            programs, and mental wellness combined in one powerful experience.
          </p>
          <p>
            Whether you prefer coaching, live classes, or a self-paced approach,
            we’ve got the tools to elevate your fitness.
          </p>
          <p>
            Every habit we help you build is designed for real-world,
            long-lasting results.
          </p>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="services">
          <h2>What Services Do We Offer</h2>
          <div className="cards">
            {servicesData.map((service, idx) => (
              <div className="service-item" key={idx}>
                <img src={service.imageAdd} alt={service.imageAlt} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
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
          <motion.button
            onClick={() => navigate("/enroll")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Your Journey
          </motion.button>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
};

export default HomePage;

