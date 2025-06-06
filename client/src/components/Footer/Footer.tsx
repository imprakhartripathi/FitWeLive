import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Footer.sass";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons"; // ✅ Import icon correctly

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

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="parent">
      <footer className="footer">
        <p>
          Copyrighted © 2025 by Archi Shukla Mishra. Site by
          Prakhar Tripathi.
        </p>
        <button onClick={() => navigate("/authadmin")}>
          <FontAwesomeIcon icon={faLock} /> {/* ✅ Use icon object here */}
        </button>
      </footer>
    </div>
  );
};

export default Footer;
