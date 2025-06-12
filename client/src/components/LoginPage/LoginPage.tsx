import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { backendURL } from "../../enviroment";
import "./LoginPage.sass";
import { motion, useInView } from "framer-motion";

import logo from "../../assets/Full_Logo-removebg-preview.png";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token); // Save token in localStorage
        alert("Login successful!");
        navigate("/tickets");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-page">
      <Navbar />
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hello Admin!
        </motion.h1>
        <p>
          Welcome to the Admin Authenticator, please enter email and password to
          continue.
        </p>
      </section>

      <FadeInSection>
        <div className="login-container">
          <Paper elevation={4} className="login-form">
            <div className="login-logo">
              <img src={logo} alt="Logo" />
            </div>

            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                className="inp"
                onChange={handleChange}
              />

              <TextField
                label="Password"
                name="password"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                className="inp"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className="login-btn"
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Paper>
        </div>
      </FadeInSection>

      <Footer />
    </div>
  );
};

export default LoginPage;
