import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../enviroment";
import { motion } from "framer-motion";
import "./TicketsPage.sass";

interface Ticket {
  _id: string;
  generatedBy: string;
  generatorEmail: string;
  generatorPhone: string;
  dob: string;
  description: string;
  isResolved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const parseDescription = (description: string) => {
  const values: { [key: string]: string } = {};
  description.split("\n").forEach((line) => {
    const [key, ...rest] = line.trim().split(":");
    if (key && rest.length > 0) {
      values[key.trim()] = rest.join(":").trim();
    }
  });
  return values;
};

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${backendURL}/tickets`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Unauthorized or failed request");

      const data = await res.json();
      setTickets(data);
    } catch (error) {
      navigate("/authadmin");
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id: string) => {
    try {
      const res = await fetch(`${backendURL}/ticket/${id}/toggle`, {
        credentials: "include",
        method: "PATCH",
      });

      if (res.ok) {
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id ? { ...ticket, isResolved: true } : ticket
          )
        );
      } else {
        alert("Failed to mark as resolved");
      }
    } catch (error) {
      console.error(error);
      alert("Error while updating ticket");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/authadmin");
  };

//   const goBackWithLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/authadmin");
      return;
    }
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="tickets-loading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <motion.div
      className="tickets-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={1}
      >
        <Typography variant="h4" className="page-heading">
          All Tickets
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </Button>
        {/* <Button
          variant="outlined"
          color="secondary"
          onClick={goBackWithLogout}
          className="logout-btn"
        >
          Go To HomePage
        </Button> */}
      </Box>

      <div className="ticket-grid">
        {tickets.map((ticket, index) => {
          const parsed = parseDescription(ticket.description);
          return (
            <motion.div
              key={ticket._id}
              className={`ticket-card ${ticket.isResolved ? "resolved" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="card-inside">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {ticket.generatedBy}
                  </Typography>
                  <Typography>Email: {ticket.generatorEmail}</Typography>
                  <Typography>Phone: {ticket.generatorPhone}</Typography>
                  <Typography>
                    DOB: {new Date(ticket.dob).toDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {`
Sex: ${parsed["Sex"]}
Age: ${parsed["Age"]}
Height: ${parsed["Height"]}
Current Weight: ${parsed["Current Weight"]}
Target Weight: ${parsed["Target Weight"]}
Average Daily Calories: ${parsed["Average Daily Calories"]}
Medical Issues: ${parsed["Medical Issues"]}`}
                  </Typography>
                  <Button
                    onClick={() => markResolved(ticket._id)}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                    className="resolve-btn"
                    disabled={ticket.isResolved}
                  >
                    Mark as Resolved
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TicketsPage;
