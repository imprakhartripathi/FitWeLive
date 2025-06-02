import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./HomePage.sass";
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

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar></Navbar>

      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get Fit for Life with FitWeLive
        </motion.h1>
        <p>Your journey to a healthier, stronger you starts here.</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Join Now
        </motion.button>
      </section>

      <FadeInSection>
        <section className="who-we-are">
          <h2>Who We Are</h2>
          <p>
            At FitWeLive, fitness is not just a goal, it's a lifelong
            commitment. Our team is made up of experienced trainers,
            nutritionists, and wellness coaches dedicated to helping you
            transform your lifestyle for lasting health.
          </p>
          <p>
            We understand that every individual is unique, so we provide
            tailored plans focusing on your personal goals, whether it’s weight
            loss, muscle gain, or overall wellness.
          </p>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="what-we-do">
          <h2>What We Do</h2>
          <p>
            We offer a holistic approach to health — blending nutrition advice,
            effective workout routines, and mental well-being strategies to help
            you achieve your ideal fitness.
          </p>
          <p>
            Our programs include one-on-one coaching, group classes, and online
            resources to ensure you have support wherever you are in your
            journey.
          </p>
          <p>
            We focus on sustainable habits that improve your metabolism, energy
            levels, and confidence.
          </p>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="services">
          <h2>What Services Do We Offer</h2>

          <div className="service-item">
            <h3>Personalized Diet Plans</h3>
            <p>
              Custom nutrition plans crafted to suit your body, preferences, and
              dietary needs.
            </p>
          </div>

          <div className="service-item">
            <h3>Workout Programs</h3>
            <p>
              From beginner to advanced, exercise routines are tailored to match
              your fitness level and lifestyle.
            </p>
          </div>

          <div className="service-item">
            <h3>Weight Loss Coaching</h3>
            <p>
              Get motivation, goal tracking, and expert advice for sustainable
              and healthy weight loss.
            </p>
          </div>

          <div className="service-item">
            <h3>Weight Gain Support</h3>
            <p>
              Safe and effective plans focused on building muscle mass and
              gaining weight in a healthy way.
            </p>
          </div>

          <div className="service-item">
            <h3>Health & Wellness Tracking</h3>
            <p>
              Monitor your fitness progress using digital tools and expert
              insights to stay on the right path.
            </p>
          </div>

          <div className="service-item">
            <h3>Mental Wellness</h3>
            <p>
              Mindfulness and stress management guidance to support your overall
              well-being.
            </p>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="testimonials">
          <h2>Success Stories</h2>
          <blockquote>
            “FitWeLive transformed my life. I lost 30 pounds in 6 months while
            gaining strength and confidence. The coaches truly care.” — Sarah M.
          </blockquote>
          <blockquote>
            “Thanks to FitWeLive’s personalized approach, I finally found a
            workout plan that fits my busy schedule.” — Raj P.
          </blockquote>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="cta">
          <h2>Get Started with Us Today</h2>
          <p>
            Take the first step towards a healthier, happier life with
            FitWeLive. Our team is ready to support you!
          </p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Start Your Journey
          </motion.button>
        </section>
      </FadeInSection>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
