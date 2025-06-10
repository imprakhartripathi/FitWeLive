import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ServicesPage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import servicesData from "../../assets/services.json";

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

const ServicesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="servicespage">
      <Navbar />

      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <p>Our Fantastic Suite of Health & Fitness Services</p>
        {/* <motion.button
          onClick={() => navigate("/enroll")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button> */}
      </section>

      <FadeInSection>
        <section className="services">
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
        <section className="description">
          <h2>About Our Services</h2>
          <p>
            At FitWeLive, we believe that health is a lifelong journey, not a
            temporary fix. Our services are designed to empower individuals of
            all fitness levels to take control of their well-being. Whether
            you're aiming for fat loss, muscle gain, or simply a more balanced
            lifestyle, our programs combine expert nutrition, personalized
            training, and supportive coaching to help you succeed.
          </p>
          <p>
            Our plans are not one-size-fits-all. We tailor each service to your
            specific goals, preferences, and physical conditions. From carefully
            structured diet charts to dynamic exercise regimens, we support you
            in building sustainable habits that lead to long-term results.
          </p>
          <h3>Disclaimer</h3>
          <p className="disclaimer">
            Some services may include physical exercises or lifestyle
            adjustments that can be initially challenging or cause mild
            discomfort. We always recommend listening to your body and
            consulting healthcare professionals if needed. Our programs are
            designed to evolve with you at a pace that feels right, ensuring
            your journey remains safe and motivating.
          </p>
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

export default ServicesPage;
