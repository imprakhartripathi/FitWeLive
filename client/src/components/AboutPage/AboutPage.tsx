import { useNavigate } from "react-router-dom";
import "./AboutPage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import archiImg from "../../assets/archi.jpg"; // Replace with actual image path
// import { useRef } from "react";
import { motion } from "framer-motion";

// const FadeInSection = ({ children }: { children: React.ReactNode }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="fade-in-section"
//     >
//       {children}
//     </motion.div>
//   );
// };

const About = () => {
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
          About FitWeLive
        </motion.h1>
        <p>How We Got Here?</p>
        {/* <motion.button
          onClick={() => navigate("/enroll")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button> */}
      </section>
      <div className="about-container">
        <div className="coach-section">
          <img src={archiImg} alt="Archi Mishra" className="coach-image" />
          <div className="coach-info">
            <h2>Archi Mishra</h2>
            <p>
              Archi Mishra is a highly dedicated doctorate and the guiding force
              behind <strong>Fit We Live</strong>. Her academic discipline and
              passion for well-being drive her commitment to help people live
              fuller, healthier lives. With a strong foundation in behavioral
              science and community empowerment, Archi believes that fitness is
              not just about physical health — it’s about emotional and mental
              strength too.
              <br />
              <br />
              Through Fit We Live, she envisions building a culture where
              individuals take daily steps toward long-term wellness. Her
              mission is to inspire consistency over intensity, mindfulness over
              obsession, and sustainability over short-term trends — ultimately
              making health a lifestyle, not a chore.
            </p>
          </div>
        </div>

        <div className="vision">
          <hr />
          <p>
            Our vision for the future includes expanding our services globally,
            launching AI-powered coaching, and building a wellness ecosystem
            that supports you every step of the way.
            <br />
            <br />
            At <strong>Fit We Live</strong>, we started with a simple mission:
            to make health and wellness accessible to everyone. From humble
            beginnings as a small community fitness initiative, we've grown into
            a dedicated platform that empowers people to take control of their
            well-being — physically and mentally.
          </p>
        </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default About;
