import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Footer.sass";

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
  return (
    <div className="parent">
      <footer className="footer">
        <p>
          Copyrighted © 2025 by Archi Shukla Mishra & Adarsh Mishra. Site by
          Prakhar Tripathi.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
