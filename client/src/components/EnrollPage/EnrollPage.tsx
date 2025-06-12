import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import {
  TextField,
  CircularProgress,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import isEmail from "validator/lib/isEmail";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { backendURL } from "../../enviroment";

import "./EnrollPage.sass";

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


const EnrollPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    generatedBy: "",
    generatorEmail: "",
    generatorPhone: "",
    dob: null as Date | null,
    sex: "",
    height: "",
    currentWeight: "",
    targetWeight: "",
    currentCalories: "",
    medicalIssues: "",
    age: "",
  });

  const calculateAge = (dob: Date) => {
    const ageDiff = Date.now() - dob.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "generatorPhone" && !/^[6-9]\d{0,9}$/.test(value)) return;
    if (name === "generatorPhone" && /^1800|^800/.test(value)) return;

    if (name === "generatorEmail" && value && !isEmail(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      generatedBy,
      generatorEmail,
      generatorPhone,
      dob,
      sex,
      height,
      currentWeight,
      targetWeight,
      currentCalories,
      medicalIssues,
    } = formData;

    const age = dob ? calculateAge(dob).toString() : "";

    const description = `
      Sex: ${sex}
      Age: ${age}
      Height: ${height} cm
      Current Weight: ${currentWeight} kg
      Target Weight: ${targetWeight} kg
      Average Daily Calories: ${currentCalories} kcal
      Medical Issues: ${medicalIssues}
    `;

    try {
      const res = await fetch(`${backendURL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generatedBy,
          generatorEmail,
          generatorPhone,
          dob: dob?.toISOString(),
          description,
        }),
      });

      if (res.ok) {
        alert("Enrolled successfully!");
        navigate("/");
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (err) {
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enroll-page">
      <Navbar />
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Enroll with FitWeLive
        </motion.h1>
        <p>Begin your transformation journey with personalized care.</p>
      </section>

      <FadeInSection>
        <section className="enroll-form">
          <form onSubmit={handleSubmit}>
            <div className="form-parent">
              <div className="colOne">
                <TextField
                  className="inp"
                  fullWidth
                  required
                  label="Full Name"
                  name="generatedBy"
                  onChange={handleChange}
                />
                <TextField
                  className="inp"
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  name="generatorEmail"
                  onChange={handleChange}
                />
                <TextField
                  className="inp"
                  fullWidth
                  required
                  label="Mobile Number"
                  name="generatorPhone"
                  value={formData.generatorPhone}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10 }}
                />
                <TextField
                  className="textarea"
                  fullWidth
                  multiline
                  label="Any Medical Issues?"
                  name="medicalIssues"
                  onChange={handleChange}
                  minRows={8}
                />
              </div>
              <div className="colTwo">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(newValue) => {
                      if (newValue) {
                        setFormData((prev) => ({
                          ...prev,
                          dob: newValue,
                          age: calculateAge(newValue).toString(),
                        }));
                      }
                    }}
                    maxDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 5)
                      )
                    }
                    slotProps={{
                      textField: {
                        className: "inp",
                        fullWidth: true,
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  className="inp"
                  fullWidth
                  label="Age"
                  name="age"
                  value={formData.age}
                  InputProps={{ readOnly: true }}
                />

                <FormControl fullWidth className="inp" required>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    name="sex"
                    value={formData.sex}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sex: e.target.value }))
                    }
                    label="Sex"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <div className="colOnePt2">
                  <div className="Two-2">
                    <TextField
                      className="inp"
                      fullWidth
                      required
                      type="number"
                      label="Height (cm)"
                      name="height"
                      onChange={handleChange}
                    />
                    <TextField
                      className="inp"
                      fullWidth
                      type="number"
                      label="Average Daily Calorie Intake"
                      name="currentCalories"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="Two-2">
                    <TextField
                      className="inp"
                      fullWidth
                      required
                      type="number"
                      label="Current Weight (kg)"
                      name="currentWeight"
                      onChange={handleChange}
                    />
                    <TextField
                      className="inp"
                      fullWidth
                      required
                      type="number"
                      label="Target Weight (kg)"
                      name="targetWeight"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </section>
      </FadeInSection>
      <Footer />
    </div>
  );
};

export default EnrollPage;
