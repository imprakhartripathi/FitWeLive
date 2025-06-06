import { useNavigate } from "react-router-dom";
import "./AboutPage.sass";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import archiImg from "../../assets/archi.jpg"; // Replace with actual image path

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About FitWeLive</h1>
        <p className="summary">
          At <strong>Fit We Live</strong>, we started with a simple mission: to
          make health and wellness accessible to everyone. From humble
          beginnings as a small community fitness initiative, we've grown into a
          dedicated platform that empowers people to take control of their
          well-being — physically and mentally.
          <br />
          <br />
          Our vision for the future includes expanding our services globally,
          launching AI-powered coaching, and building a wellness ecosystem that
          supports you every step of the way.
        </p>

        <hr />

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

        <section className="cta">
          <h2>Get Started with Us Today</h2>
          <p>
            Take the first step towards a healthier, happier life with
            FitWeLive. Our team is ready to support you!
          </p>
          <button
            onClick={() => navigate("/enroll")}>
            Start Your Journey
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
