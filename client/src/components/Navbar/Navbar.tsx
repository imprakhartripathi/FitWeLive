// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
import "./Navbar.sass";
import logo from "../../assets/Horizontal_Logo-removebg-preview.png";
import { useNavigate, useLocation } from "react-router-dom";

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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="parent">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        </div>
        <ul className="nav-links">
          <li
            className={isActive("/") ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={isActive("/services") ? "active" : ""}
            onClick={() => navigate("/services")}
          >
            Services
          </li>
          <li
            className={isActive("/about") ? "active" : ""}
            onClick={() => navigate("/about")}
          >
            About Us
          </li>
          <li
            className={isActive("/contact") ? "active" : ""}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
