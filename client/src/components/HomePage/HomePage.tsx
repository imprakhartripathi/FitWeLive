import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./HomePage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

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
            {[
              {
                title: "Personalized Diet Plans",
                description:
                  "Custom nutrition plans crafted to suit your body, preferences, and dietary needs.",
                imageAlt: "Diet Plan",
                imageAdd:
                  "https://img.freepik.com/free-vector/diet-plan-schedule_3446-617.jpg?semt=ais_hybrid&w=740",
              },
              {
                title: "Workout Programs",
                description:
                  "From beginner to advanced, exercise routines are tailored to match your fitness level and lifestyle.",
                imageAlt: "Workout Program",
                imageAdd:
                  "https://img.freepik.com/free-vector/coaches-concept-illustration_114360-7939.jpg?semt=ais_items_boosted&w=740",
              },
              {
                title: "Weight Loss Coaching",
                description:
                  "Get motivation, goal tracking, and expert advice for sustainable and healthy weight loss.",
                imageAlt: "Weight Loss Coaching",
                imageAdd:
                  "https://img.freepik.com/free-vector/body-contouring-abstract-concept-illustration-non-surgical-plastic-body-correction-contouring-technology-reduction-aesthetic-treatment-service-non-invasive-procedure_335657-544.jpg?semt=ais_hybrid&w=740",
              },
              {
                title: "Weight Gain Support",
                description:
                  "Safe and effective plans focused on building muscle mass and gaining weight in a healthy way.",
                imageAlt: "Weight Gain Support",
                imageAdd:
                  "https://img.freepik.com/free-vector/body-mass-index-abstract-concept-vector-illustration-health-issue-diagnostics-weight-loss-program-body-mass-fat-index-healthy-bmi-calculation-formula-nutrition-plan-abstract-metaphor_335657-4039.jpg?semt=ais_hybrid&w=740",
              },
              {
                title: "Health & Wellness Tracking",
                description:
                  "Monitor your fitness progress using digital tools and expert insights to stay on the right path.",
                imageAlt: "Health Tracking",
                imageAdd:
                  "https://img.freepik.com/free-vector/fitness-trackers-flat-design_23-2148534977.jpg?semt=ais_hybrid&w=740",
              },
              {
                title: "Mental Wellness",
                description:
                  "Mindfulness and stress management guidance to support your overall well-being.",
                imageAlt: "Mental Wellness",
                imageAdd:
                  "https://img.freepik.com/free-vector/organic-flat-people-meditating-illustration_23-2148928222.jpg",
              },
              {
                title: "Live Fitness Classes",
                description:
                  "Join real-time virtual workouts led by certified trainers, keeping you motivated and accountable from anywhere.",
                imageAlt: "Live Fitness Classes",
                imageAdd:
                  "https://img.freepik.com/premium-photo/person-visiting-local-gym-fitness-facility-regular-workouts-while-traveling_1314467-48013.jpg",
              },
              {
                title: "Fitness Challenges & Rewards",
                description:
                  "Participate in engaging fitness challenges and earn rewards for consistency, progress, and community participation.",
                imageAlt: "Fitness Challenges",
                imageAdd:
                  "https://img.freepik.com/free-vector/winners-concept-illustration_114360-2119.jpg?semt=ais_hybrid&w=740",
              },
            ].map((service, idx) => (
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
        <section className="testimonials">
          <h2>Success Stories</h2>
          <blockquote>
            “FitWeLive transformed my life. I lost 30 kilos in 6 months while
            gaining strength and confidence. The coaches truly care.” — someone.
          </blockquote>
          <blockquote>
            “Thanks to FitWeLive’s personalized approach, I finally found a
            workout plan that fits my busy schedule.” — Raj P.
          </blockquote>
          <blockquote>and many more.......</blockquote>
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

