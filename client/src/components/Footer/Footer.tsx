import { Tooltip } from "react-tooltip"; // ✅ Correct import
import "react-tooltip/dist/react-tooltip.css"; // ✅ Required CSS import

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
import "./Footer.sass";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTicket } from "@fortawesome/free-solid-svg-icons";

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

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="parent">
      <footer className="footer">
        <p>
          Copyrighted © 2025 by Archi Shukla Mishra. Site by Prakhar Tripathi.
        </p>

        <button
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Admin Login"
          onClick={() => navigate("/authadmin")}
        >
          <FontAwesomeIcon icon={faLock} />
        </button>
        <button
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Tickets"
          onClick={() => navigate("/tickets")}
        >
          <FontAwesomeIcon icon={faTicket} />
        </button>

        {/* ✅ Attach tooltip using ID */}
        <Tooltip id="admin-tooltip" place="right" />
      </footer>
    </div>
  );
};

export default Footer;
